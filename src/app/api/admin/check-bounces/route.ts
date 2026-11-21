import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import imap from "imap-simple";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const smtpPassword = "kiik xpfz wnhb biym";
  if (!smtpPassword) {
    return NextResponse.json(
      { error: "SMTP_PASSWORD environment variable is not set." },
      { status: 500 },
    );
  }

  const config = {
    imap: {
      user: "devfuturest@gmail.com",
      password: "kiik xpfz wnhb biym",
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      authTimeout: 10000,
      tlsOptions: {
        rejectUnauthorized: false,
      },
    },
  };

  try {
    const connection = await imap.connect(config);
    await connection.openBox("INBOX");

    // 1. CARI EMAIL ERROR (24 JAM TERAKHIR)
    const delay = 1 * 3600 * 1000;
    const yesterday = new Date();
    yesterday.setTime(Date.now() - delay);

    const searchCriteria = [
      ["SINCE", yesterday],
      ["FROM", "mailer-daemon@googlemail.com"],
    ];

    const fetchOptions = {
      bodies: [""], // Ambil RAW Source utuh
      markSeen: false,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length === 0) {
      connection.end();
      return NextResponse.json({
        message: "No bounced emails found in last 24h",
        count: 0,
      });
    }

    const bouncedEmails: string[] = [];

    // 2. PARSING RAW SOURCE LANGSUNG (TANPA SIMPLEPARSER)
    for (const item of messages) {
      const part = item.parts.find((p) => p.which === "");
      const rawSource = part?.body || "";

      if (rawSource) {
        // --- STRATEGI 1: CARI HEADER 'FINAL-RECIPIENT' (PALING AKURAT) ---
        // Format biasanya: "Final-Recipient: rfc822; email@salah.com"
        const finalRecipientRegex =
          /Final-Recipient:\s*[a-zA-Z0-9-]+\;\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i;
        const recipientMatch = rawSource.match(finalRecipientRegex);

        if (recipientMatch && recipientMatch[1]) {
          bouncedEmails.push(recipientMatch[1].trim());
        } else {
          // --- STRATEGI 2: FALLBACK CARI EMAIL DI BODY ---
          // Kalau header ga ketemu, kita cari paksa string email di seluruh raw text
          // Filter: jangan ambil email admin atau google
          const emailRegex =
            /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/gi;
          const matches = rawSource.match(emailRegex);

          if (matches) {
            const potentialEmails = matches.filter(
              (e: string) =>
                !e.includes("devfuturest@gmail.com") &&
                !e.includes("googlemail.com") &&
                !e.includes("postmaster") &&
                !e.includes("rfc-editor.org"), // filter link RFC
            );
            bouncedEmails.push(...potentialEmails);
          }
        }
      }
    }

    connection.end();

    // 3. UPDATE FIREBASE
    let updatedCount = 0;
    const uniqueBouncedEmails = Array.from(new Set(bouncedEmails));

    // console.log("BOUNCED EMAILS FOUND:", uniqueBouncedEmails); // Cek di terminal server

    if (uniqueBouncedEmails.length > 0) {
      const batch = writeBatch(db);
      const logsRef = collection(db, "mail_logs_ba");

      for (const email of uniqueBouncedEmails) {
        // Cari log yang statusnya 'success' tapi ternyata emailnya ada di list bounce
        const q = query(
          logsRef,
          where("recipient", "==", email),
          where("status", "==", "success"),
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          batch.update(doc.ref, {
            status: "bounced",
            bouncedAt: new Date().toISOString(),
            bounceReason: "Address not found / Blocked / Typo",
          });
          updatedCount++;
        });
      }

      if (updatedCount > 0) {
        await batch.commit();
      }
    }

    return NextResponse.json({
      success: true,
      message: `Checked ${messages.length} messages. Found ${uniqueBouncedEmails.length} bounced addresses. Updated ${updatedCount} logs.`,
      bounced_emails: uniqueBouncedEmails,
    });
  } catch (error) {
    console.error("IMAP Error:", error);
    return NextResponse.json(
      { error: "Failed to check emails", details: (error as Error).message },
      { status: 500 },
    );
  }
}
