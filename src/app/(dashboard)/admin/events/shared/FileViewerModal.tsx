"use client";

import { X, Loader2, Download, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Typography from "@/components/typography";
import toast from "react-hot-toast";

interface FileViewerModalProps {
  fileUrl: string;
  onClose: () => void;
}

export default function FileViewerModal({
  fileUrl,
  onClose,
}: FileViewerModalProps) {
  const [loading, setLoading] = useState(true);
  const [fileType, setFileType] = useState<"image" | "pdf" | "unknown" | null>(
    null,
  );
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let urlToRevoke: string | null = null;

    const loadFile = async () => {
      setLoading(true);
      setError(false);
      try {
        // Ambil file sebagai blob beserta headers-nya
        const response = await fetch(fileUrl);
        if (!response.ok) toast.error("Gagal mengambil file");

        const contentType = response.headers.get("Content-Type") || "";
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setBlobUrl(objectUrl);
          urlToRevoke = objectUrl;

          if (contentType.startsWith("image/")) {
            setFileType("image");
          } else if (contentType === "application/pdf") {
            setFileType("pdf");
          } else {
            setFileType("unknown"); // Format lain (zip, docx, dll)
          }
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFile();

    // Cleanup: hapus blob url saat modal ditutup untuk mencegah memory leak
    return () => {
      isMounted = false;
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    };
  }, [fileUrl]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-5xl h-[85vh] flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl">
        {/* Header Modal */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#2a2a2a] border-b border-gray-700">
          <Typography className="text-white font-semibold text-sm truncate pr-4">
            Attachment Viewer
          </Typography>
          <div className="flex items-center gap-4">
            {/* Tombol Eksternal Download */}
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Download size={18} />
              <span className="text-sm hidden sm:block">Download</span>
            </a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors bg-gray-700 hover:bg-red-500 rounded-full p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative flex items-center justify-center bg-[#121212] overflow-auto">
          {/* STATE: LOADING */}
          {loading && (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="animate-spin" size={40} />
              <Typography>Memuat dokumen...</Typography>
            </div>
          )}

          {/* STATE: ERROR */}
          {!loading && error && (
            <div className="flex flex-col items-center gap-3 text-red-400">
              <AlertCircle size={48} />
              <Typography>Gagal memuat dokumen.</Typography>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Buka di Tab Baru
              </a>
            </div>
          )}

          {/* STATE: SUCCESS IMAGE */}
          {!loading && !error && fileType === "image" && blobUrl && (
            // Menggunakan tag img standar HTML karena kita merender blob internal
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blobUrl}
              alt="Attachment"
              className="max-w-full max-h-full object-contain"
            />
          )}

          {/* STATE: SUCCESS PDF */}
          {!loading && !error && fileType === "pdf" && blobUrl && (
            <iframe
              src={blobUrl}
              className="w-full h-full border-none"
              title="PDF Viewer"
            />
          )}

          {/* STATE: UNKNOWN FORMAT */}
          {!loading && !error && fileType === "unknown" && (
            <div className="flex flex-col items-center gap-4 text-gray-300 text-center px-4">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
                <Download size={32} className="text-gray-400" />
              </div>
              <div>
                <Typography className="font-semibold text-lg">
                  Format File Tidak Didukung
                </Typography>
                <Typography className="text-sm text-gray-400 mt-1">
                  Browser tidak dapat menampilkan pratinjau untuk jenis file
                  ini.
                </Typography>
              </div>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-6 py-3 bg-[#3A6AB2] text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors mt-2"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
