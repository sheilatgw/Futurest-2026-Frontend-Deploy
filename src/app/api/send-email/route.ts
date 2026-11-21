import { getCaseRevealEmail } from "@/lib/email-template-minicase";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(request: Request) {
  // Anggap request body nerima array object: { email: string, name: string, id: string }
  const { participants } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "devfuturest@gmail.com",
      pass: "kiik xpfz wnhb biym",
    },
  });

  try {
    await Promise.all(
      participants.map(async (p: any) => {
        // Disini p.name diambil dari payload frontend tadi
        const emailHtml = getCaseRevealEmail(p.name);

        await transporter.sendMail({
          from: '"FutureTalk Admin" <devfuturest@gmail.com>',
          to: p.email,
          subject: "🚨 Case Reveal - FutureTalk Minicase",
          html: emailHtml,
        });

        // Update Firebase
        await setDoc(doc(db, "mail_logs", p.id), {
          sentAt: new Date().toISOString(),
          type: "CASE_REVEAL",
        });
      }),
    );

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json({ error: "Gagal kirim email" }, { status: 500 });
  }
}
