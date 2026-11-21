import { NextResponse } from "next/server";
import { google } from "googleapis";
import PDFParser from "pdf2json";
import mammoth from "mammoth"; // <--- WAJIB PAKE INI

// --- 1. KONFIGURASI TEKS ---
const normalizeText = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const REQUIRED_CONTENT_RAW = `Kami yang bertanda tangan di bawah ini, menyatakan bahwa esai dengan judul di atas merupakan karya orisinal yang dibuat oleh penulis`;
const TARGET_NEEDLE = normalizeText(REQUIRED_CONTENT_RAW);

// --- 2. HELPER: PARSE PDF ---
const parsePdfBuffer = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, true);
    pdfParser.on("pdfParser_dataError", (errData: any) =>
      reject(new Error(errData.parserError)),
    );
    pdfParser.on("pdfParser_dataReady", () => {
      const rawText = pdfParser.getRawTextContent();
      try {
        // Percobaan decode normal
        resolve(decodeURIComponent(rawText));
      } catch (error) {
        // 🚀 JIKA ERROR URI MALFORMED (Ada simbol % nyasar)
        // Regex ini mencari tanda '%' yang TIDAK diikuti oleh 2 karakter hexadesimal yang valid,
        // lalu mengubahnya secara manual menjadi '%25' agar tidak crash saat di-decode.
        const fixedText = rawText.replace(/%(?![0-9a-fA-F]{2})/g, "%25");
        try {
          resolve(decodeURIComponent(fixedText));
        } catch (fallbackError) {
          // Kalau masih gagal juga (sangat jarang), return raw text saja biar server gak crash
          resolve(rawText);
        }
      }
    });

    pdfParser.parseBuffer(buffer);
  });
};

// --- 3. MIME TYPES ---
const MIME = {
  GOOGLE_DOC: "application/vnd.google-apps.document",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  PDF: "application/pdf",
};

const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/cloud-platform",
];

export async function POST(request: Request) {
  try {
    const { folderId } = await request.json();

    // AUTH
    const jsonString = process.env.NEXT_PUBLIC_GOOGLE_API_SERVICES;
    const auth = new google.auth.GoogleAuth({
      credentials: jsonString ? JSON.parse(jsonString) : undefined,
      keyFile: jsonString ? undefined : "service-account.json",
      scopes: SCOPES,
    });

    const drive = google.drive({ version: "v3", auth });
    const vision = google.vision({ version: "v1", auth });

    // GET METADATA
    const folderMeta = await drive.files.get({
      fileId: folderId,
      fields: "id, name, permissions",
    });
    const isPublic = (folderMeta.data.permissions || []).some(
      (p) => p.type === "anyone",
    );

    const filesList = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType)",
    });
    const files = filesList.data.files || [];

    // SORTING
    const candidates = files
      .filter(
        (f) =>
          f.mimeType === MIME.GOOGLE_DOC ||
          f.mimeType === MIME.DOCX ||
          f.mimeType === MIME.PDF ||
          f.mimeType?.startsWith("image/"),
      )
      .sort((a, b) => {
        const keywords = [
          "orisinalitas",
          "originality",
          "pernyataan",
          "statement",
          "surat",
          "bukti",
        ];
        const score = (name: string) =>
          keywords.some((k) => name.toLowerCase().includes(k)) ? 1 : 0;
        return score(b.name!) - score(a.name!);
      });

    let proofFound = false;
    let matchedFile = null;

    for (const file of candidates) {
      try {
        let text = "";
        // console.log(`🔍 Scanning: ${file.name} | Type: ${file.mimeType}`);

        if (file.mimeType === MIME.GOOGLE_DOC) {
          // KHUSUS GOOGLE DOCS: Pake Export
          const res = await drive.files.export(
            { fileId: file.id!, mimeType: "application/pdf" },
            { responseType: "arraybuffer" },
          );
          text = await parsePdfBuffer(Buffer.from(res.data as ArrayBuffer));
        } else {
          // FILE BIASA (.docx, .pdf, .jpg): Pake Get Media
          const res = await drive.files.get(
            { fileId: file.id!, alt: "media" },
            { responseType: "arraybuffer" },
          );
          const buffer = Buffer.from(res.data as ArrayBuffer);

          if (file.mimeType === MIME.DOCX) {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
          } else if (file.mimeType === MIME.PDF) {
            text = await parsePdfBuffer(buffer);
          } else if (file.mimeType?.startsWith("image/")) {
            const visionRes = await vision.images.annotate({
              requestBody: {
                requests: [
                  {
                    image: { content: buffer.toString("base64") },
                    features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
                  },
                ],
              },
            });
            const result = visionRes.data.responses?.[0];
            text = result?.fullTextAnnotation?.text || "";
          }
        }

        if (normalizeText(text).includes(TARGET_NEEDLE)) {
          proofFound = true;
          matchedFile = file.name;
          // console.log(`✅ MATCH FOUND: ${file.name}`);
          break;
        }
      } catch (e: any) {
        // console.error(`❌ Gagal scan ${file.name}:`, e.message);
      }
    }

    return NextResponse.json({
      success: isPublic && files.length >= 2 && proofFound,
      folderName: folderMeta.data.name,
      isPublic,
      fileCount: files.length,
      proofFound,
      matchedFile,
      message: proofFound ? "Lulus" : "Gagal menemukan pernyataan orisinalitas",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 },
    );
  }
}
