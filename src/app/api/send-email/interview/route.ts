import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- HELPER: FORMAT TANGGAL ---
// const formatDate = (dateString: string) => {
//   if (!dateString) return "-";
//   return new Date(dateString).toLocaleString("id-ID", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZoneName: "short",
//   });
// };

// --- HELPER: TEMPLATE EMAIL (DESIGN MATCHING REFERENCE) ---
const getInterviewEmailHtml = (
  name: string,

  isAccepted?: boolean,
) => {
  return isAccepted
    ? `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Announcement - Futurest Brand Ambassador</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* Reset & Base */
    body { margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Sora', sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; display: block; }
    a { text-decoration: none; }

    /* Utilities */
    .wrapper { width: 100%; table-layout: fixed; background-color: #F8FAFC; padding: 40px 0; }
    .main-card { background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); overflow: hidden; margin: 0 auto; max-width: 560px; border: 1px solid #E2E8F0; }
    
    /* Typography */
    h1 { margin: 0; font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.5px; }
    p { margin: 0; font-size: 15px; line-height: 1.7; color: #64748B; }
    strong { color: #D97706; font-weight: 600; } /* Brand Color BA (Orange/Amber) */

    /* Components */
    .status-badge {
      display: inline-block;
      background-color: #FEF3C7; /* Amber 100 */
      color: #B45309; /* Amber 700 */
      padding: 6px 12px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    /* Mobile Responsive */
    @media screen and (max-width: 600px) {
      .main-card { width: 92% !important; border-radius: 16px; }
      .content-pad { padding: 32px 24px !important; }
      h1 { font-size: 20px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <center>
      
      <table width="100%" style="max-width: 560px; margin-bottom: 24px;">
        <tr>
          <td align="center">
            <span style="font-weight: 700; color: #94A3B8; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Futurest 2026 Event</span>
          </td>
        </tr>
      </table>

      <table class="main-card" width="560" cellpadding="0" cellspacing="0">
        
        <tr>
          <td align="center" style="background-color: #FFC247; padding: 40px 0;">
            <img 
              src="https://futurest.id/images/events/brand-ambassador/hero-title.svg"
              alt="Brand Ambassador Banner"
              width="200"
              style="width: 80%; max-width: 300px; height: auto; display: block;"
            />
          </td>
        </tr>

        <tr>
          <td class="content-pad" style="padding: 48px 40px;">
            
            <span class="status-badge">🎉 Congratulations</span>

            <h1 style="margin-bottom: 12px;">Welcome to Futurest!</h1>
            
            <p style="margin-bottom: 16px;">
              Dear <strong>${name}</strong>,
            </p>
            <p style="margin-bottom: 16px;">
              We are pleased to inform you that you have been successfully accepted as a <strong>Brand Ambassador of FUTUREST 2026</strong>.
            </p>
            <p style="margin-bottom: 32px;">
              After going through the selection process, our committee was impressed by your enthusiasm, potential, and passion. We truly believe that you will be a great addition to the FUTUREST 2026 team and contribute positively to the success of this event.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
              <tr>
                <td style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px;">
                  
                  <p style="font-size:13px; color:#64748B; margin-bottom:16px;">
                    To proceed to the next stage, please confirm your availability by contacting the CP below no later than:
                  </p>

                  <table width="100%">
                    <tr>
                      <td width="32" valign="top" style="padding-top: 2px;">
                          <div style="background:#FEE2E2; color:#DC2626; width:32px; height:32px; border-radius:8px; text-align:center; line-height:32px; font-size:16px;">⏰</div>
                      </td>
                      <td style="padding-left: 16px;">
                        <h3 style="margin:0 0 4px 0; font-size:14px; font-weight:700; color:#1E293B;">Confirmation Deadline</h3>
                        <p style="font-size:13px; color:#DC2626; font-weight:600; margin:0;">5 February 2026, 15.00 WIB</p>
                      </td>
                    </tr>
                  </table>

                  <div style="height:1px; background-color:#E2E8F0; width:100%; margin: 16px 0;"></div>

                  <table width="100%">
                    <tr>
                      <td width="32" valign="top" style="padding-top: 2px;">
                          <div style="background:#DCFCE7; color:#166534; width:32px; height:32px; border-radius:8px; text-align:center; line-height:32px; font-size:16px;">📞</div>
                      </td>
                      <td style="padding-left: 16px;">
                        <h3 style="margin:0 0 4px 0; font-size:14px; font-weight:700; color:#1E293B;">Contact Person (Gizza)</h3>
                        <a href="https://wa.me/6285282422021" target="_blank" style="color:#D97706; font-size:13px; font-weight:600; text-decoration:underline;">
                          +62 852-8242-2021
                        </a>
                      </td>
                    </tr>
                  </table>

                   <div style="height:1px; background-color:#E2E8F0; width:100%; margin: 16px 0;"></div>

                  <table width="100%">
                    <tr>
                      <td width="32" valign="top" style="padding-top: 2px;">
                          <div style="background:#DCFCE7; color:#166534; width:32px; height:32px; border-radius:8px; text-align:center; line-height:32px; font-size:16px;">📞</div>
                      </td>
                      <td style="padding-left: 16px;">
                        <h3 style="margin:0 0 4px 0; font-size:14px; font-weight:700; color:#1E293B;">Contact Person (Alif)</h3>
                        <a href="https://wa.me/6281359911380" target="_blank" style="color:#D97706; font-size:13px; font-weight:600; text-decoration:underline;">
                          +62 813-5991-1380
                        </a>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <table width="100%">
              <tr>
                <td align="center">
                  <p style="font-size: 14px; color: #64748B; margin-bottom: 24px;">
                    Further information regarding onboarding, schedules, and responsibilities will be shared after confirmation.
                  </p>
                  <p style="font-size: 14px; font-weight: 600; color: #1E293B;">
                    Warm regards,<br>
                    FUTUREST 2026 Committee
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>
        
        <tr>
          <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 40px;">
            <table width="100%">
              <tr>
                <td align="left">
                   <p style="font-size: 12px; color: #94A3B8; margin-bottom: 4px;">Sent to <strong>${name}</strong></p>
                   <p style="font-size: 12px; color: #CBD5E1;">© 2026 Futurest ITS. Surabaya, Indonesia.</p>
                </td>
                <td align="right" valign="top">
                  <a href="https://futurest.id" style="font-size:12px; color:#D97706; font-weight:600;">futurest.id</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      
      <div style="display:none; max-height:0px; overflow:hidden;">
        Congratulations! You have been accepted as Brand Ambassador for Futurest 2026. Please confirm your attendance.
      </div>

    </center>
  </div>
</body>
</html>
  `
    : `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Selection Update - Futurest Brand Ambassador</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* Reset & Base */
    body { margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Sora', sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; display: block; }
    a { text-decoration: none; }

    /* Utilities */
    .wrapper { width: 100%; table-layout: fixed; background-color: #F8FAFC; padding: 40px 0; }
    .main-card { background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); overflow: hidden; margin: 0 auto; max-width: 560px; border: 1px solid #E2E8F0; }
    
    /* Typography */
    h1 { margin: 0; font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.5px; }
    p { margin: 0; font-size: 15px; line-height: 1.7; color: #64748B; }
    strong { color: #334155; font-weight: 600; } 

    /* Components */
    .btn-secondary { 
      background-color: #F1F5F9; /* Slate 100 */
      color: #334155 !important; /* Slate 700 */
      display: block; 
      padding: 16px; 
      border-radius: 12px; 
      text-align: center; 
      font-weight: 600; 
      font-size: 15px;
      transition: all 0.2s;
      border: 1px solid #CBD5E1;
    }
    
    .status-badge {
      display: inline-block;
      background-color: #F1F5F9; /* Slate 100 */
      color: #475569; /* Slate 600 */
      padding: 6px 12px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    /* Mobile Responsive */
    @media screen and (max-width: 600px) {
      .main-card { width: 92% !important; border-radius: 16px; }
      .content-pad { padding: 32px 24px !important; }
      h1 { font-size: 20px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <center>
      
      <table width="100%" style="max-width: 560px; margin-bottom: 24px;">
        <tr>
          <td align="center">
            <span style="font-weight: 700; color: #94A3B8; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Futurest 2026 Event</span>
          </td>
        </tr>
      </table>

      <table class="main-card" width="560" cellpadding="0" cellspacing="0">
        
        <tr>
          <td align="center" style="background-color: #354FB4; padding: 40px 0;">
            <img 
              src="https://futurest.id/images/events/brand-ambassador/hero-title.svg"
              alt="Brand Ambassador Banner"
              width="200"
              style="width: 80%; max-width: 300px; height: auto; display: block; filter: brightness(0) invert(1);" 
            />
            </td>
        </tr>

        <tr>
          <td class="content-pad" style="padding: 48px 40px;">
            
            <span class="status-badge">📢 Selection Result</span>

            <h1 style="margin-bottom: 12px;">Thank You, ${name}.</h1>
            
            <p style="margin-bottom: 16px;">
              Dear Future Hero,
            </p>
            <p style="margin-bottom: 16px;">
              Thank you for your interest in becoming a <strong>Brand Ambassador for FUTUREST 2026</strong> and for the time and effort you invested throughout the selection process.
            </p>
            <p style="margin-bottom: 16px;">
              After thorough review and discussion, we regret to inform you that we are unable to move forward with your application at this stage. This was a difficult decision due to the strong quality of candidates we received.
            </p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <tr>
                <td style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
                  <p style="font-size: 14px; color: #475569; margin: 0; font-style: italic;">
                    "We sincerely appreciate your enthusiasm, dedication, and willingness to be part of FUTUREST 2026."
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin-bottom: 32px;">
              We hope you will continue to stay engaged with our future programs and initiatives, and we would be glad to see you participate again in upcoming opportunities. We wish you every success in your future academic and professional endeavors.
            </p>

            <table width="100%">
              <tr>
                <td align="center">
                  
                  <a href="https://instagram.com/futurest.2026" class="btn-secondary">
                    Stay Connected on Instagram
                  </a>

                  <p style="font-size: 14px; font-weight: 600; color: #1E293B; margin-top: 24px;">
                    Warm regards,<br>
                    FUTUREST 2026 Committee
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>
        
        <tr>
          <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 40px;">
            <table width="100%">
              <tr>
                <td align="left">
                   <p style="font-size: 12px; color: #94A3B8; margin-bottom: 4px;">Sent to <strong>${name}</strong></p>
                   <p style="font-size: 12px; color: #CBD5E1;">© 2026 Futurest ITS. Surabaya, Indonesia.</p>
                </td>
                <td align="right" valign="top">
                  <a href="https://futurest.id" style="font-size:12px; color:#334155; font-weight:600;">futurest.id</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      
      <div style="display:none; max-height:0px; overflow:hidden;">
        Update regarding your application for Futurest 2026 Brand Ambassador.
      </div>

    </center>
  </div>
</body>
</html>`;
};

// --- API HANDLER ---
export async function POST(request: Request) {
  const { email, name, id, isAccepted } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "devfuturest@gmail.com",
      pass: "kiik xpfz wnhb biym", // App Password
    },
  });

  try {
    await transporter.verify();
  } catch (verifyError) {
    // console.error("❌ [SMTP] Connection Failed:", verifyError);
    return NextResponse.json(
      { error: "Gagal connect ke Gmail. Cek Password App." },
      { status: 500 },
    );
  }

  const emailHtml = getInterviewEmailHtml(name, isAccepted);

  // 4. KIRIM EMAIL
  const info = await transporter.sendMail({
    from: '"Futurest Admin" <devfuturest@gmail.com>',
    to: email, // TESTING EMAIL
    subject: "🎉 The Time has Come! Your Futurest 2026 Brand Ambassador Status",
    html: emailHtml,
  });

  // 5. LOG KE FIREBASE
  if (id) {
    await setDoc(doc(db, "mail_logs_ba", id), {
      sentAt: new Date().toISOString(),
      type: "BA_ANNOUNCEMENT",
      recipient: email,
      status: "success",
      messageId: info.messageId,
    });
  }

  return NextResponse.json({ success: true });
}
