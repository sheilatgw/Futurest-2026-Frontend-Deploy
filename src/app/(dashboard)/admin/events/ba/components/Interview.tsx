"use client";

import Button from "@/components/buttons/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScheduleInterview } from "@/hooks/use-ba";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";

interface InterviewForm {
  interview_date: string;
  interview_method: string;
  interview_link: string;
  notes: string;
}

type InterviewSectionProps = {
  participantId: string;
  interview_schedule: string | null;
  interview_method: string | null;
  interview_link: string | null;
  interview_notes: string | null;
  email: string;
  name: string;
  phone: string;
  status:
    | "ACCEPTED"
    | "REJECTED"
    | "PENDING_REVIEW"
    | "UNDER_REVIEW"
    | "INTERVIEW_SCHEDULED"
    | "INTERVIEW_COMPLETED"
    | null;
};

// --- HELPER: VERIFIKASI PENGIRIMAN (AUTO-CHECK) ---
const verifyEmailDelivery = async (targetEmail: string) => {
  await new Promise((resolve) => setTimeout(resolve, 4000)); // Tunggu 4 detik
  try {
    const res = await fetch("/api/admin/check-bounces", { method: "POST" });
    const data = await res.json();
    if (data.bounced_emails && Array.isArray(data.bounced_emails)) {
      const isBounced = data.bounced_emails.includes(targetEmail);
      return isBounced ? "BOUNCED" : "DELIVERED";
    }
    return "DELIVERED";
  } catch (e) {
    console.error("Gagal cek bounce:", e);
    return "UNKNOWN";
  }
};

export function InterviewSection({
  participantId,
  interview_schedule,
  interview_method,
  interview_link,
  interview_notes,
  email,
  name,
  phone,
  status,
}: InterviewSectionProps) {
  const isAlreadyScheduled = Boolean(interview_schedule);

  if (isAlreadyScheduled) {
    return (
      <InterviewViewMode
        schedule={interview_schedule}
        method={interview_method}
        link={interview_link}
        notes={interview_notes}
        participantId={participantId}
        email={email}
        name={name}
        phone={phone}
        status={status}
      />
    );
  }

  return (
    <InterviewFormMode
      participantId={participantId}
      email={email}
      name={name}
    />
  );
}

// ────────────────────────────────────────────────

function InterviewViewMode({
  schedule,
  method,
  link,
  notes,
  participantId,
  email,
  name,
  phone,
  status,
}: {
  schedule: string | null;
  method: string | null;
  link: string | null;
  notes: string | null;
  participantId: string;
  email: string;
  name: string;
  phone: string;
  status:
    | "ACCEPTED"
    | "REJECTED"
    | "PENDING_REVIEW"
    | "UNDER_REVIEW"
    | "INTERVIEW_SCHEDULED"
    | "INTERVIEW_COMPLETED"
    | null;
}) {
  const [isResending, setIsResending] = useState(false);
  // State status email: 'success' | 'bounced' | null
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  // 🔥 REALTIME LISTENER FIREBASE 🔥
  useEffect(() => {
    if (!participantId) return;
    const unsub = onSnapshot(doc(db, "mail_logs", participantId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setEmailStatus(data.status); // 'success' atau 'bounced'
      }
    });
    return () => unsub();
  }, [participantId]);

  // --- LOGIC RESEND EMAIL ---
  const handleResend = async () => {
    setIsResending(true);
    const toastId = toast.loading("Mengirim ulang email...", {
      id: "resend-email",
    });

    try {
      const res = await fetch("/api/send-email/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: participantId,
          email,
          name,
          isAccepted: status === "ACCEPTED" ? true : false,
        }),
      });

      if (res.ok) {
        toast.loading("Memverifikasi ulang (tunggu 5s)...", { id: toastId });
        const status = await verifyEmailDelivery(email);

        if (status === "BOUNCED") {
          toast.error("Masih Gagal. Coba minta email lain via WA.", {
            id: toastId,
          });
        } else {
          toast.success("Terkirim! Semoga kali ini masuk.", { id: toastId });
        }
      } else {
        toast.error("Gagal mengirim ulang.", { id: toastId });
      }
    } catch (_e) {
      toast.error("Error koneksi.", { id: toastId });
    } finally {
      setIsResending(false);
    }
  };
  const formatWaNumber = (phone: string) => {
    if (!phone) return "";

    // 1. Hapus semua karakter selain angka (spasi, strip, dll)
    let clean = phone.toString().replace(/\D/g, "");

    // 2. Ubah 08 jadi 628
    if (clean.startsWith("0")) {
      clean = "62" + clean.slice(1);
    }

    return clean;
  };
  const waNumber = formatWaNumber(phone); // Pake props phone dari parent

  const formattedDate = schedule
    ? new Date(schedule).toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    : "-";

  // 1. Link Chat Normal (Lengkap dengan Jadwal & Link)
  const messageRaw = `Halo *${name}*! 

Selamat, kamu dinyatakan *LOLOS* ke tahap Interview Futurest Brand Ambassador! 

Berikut detail jadwal interview kamu:
 *Waktu:* ${formattedDate}
${link ? `🔗 *Link:* ${link}` : ""}

Harap hadir 5 menit sebelum jadwal ya. Semangat dan Good Luck! 
Terima kasih.`;

  // 🔥 SOLUSI EMOTICON ERROR: Bungkus pake encodeURIComponent
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    messageRaw,
  )}`;

  // 2. Link Khusus Bounced (Minta Email Baru - Lebih Sopan)
  const messageBouncedRaw = `Halo *${name}*! 

Mohon maaf mengganggu waktunya.
Kami dari panitia Futurest ingin menginfokan bahwa email undangan interview ke alamat *"${email}"* gagal terkirim (bounce/penuh). 

Boleh tolong infokan alamat email alternatif yang aktif?
Terima kasih sebelumnya. `;

  const waBouncedLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    messageBouncedRaw,
  )}`;

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="bg-neutral-50 px-4 py-3 border-b font-semibold text-center flex justify-between items-center">
        <span className="text-neutral-700">Jadwal Interview</span>

        {/* Indikator Status Simple di Header */}
        {emailStatus === "success" && (
          <span className="flex items-center gap-1 text-[10px] font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200">
            <CheckCircle2 size={12} /> Terkirim
          </span>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* 🔥 ALERT STATUS EMAIL (JIKA BOUNCED) 🔥 */}
        {emailStatus === "bounced" ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col gap-2 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="text-red-600 shrink-0 mt-0.5"
                size={18}
              />
              <div>
                <h4 className="text-sm font-bold text-red-700">
                  Gagal Terkirim! (Email Salah/Penuh)
                </h4>
                <p className="text-xs text-red-600 mt-1 leading-relaxed">
                  Email ke <strong>{email}</strong> ditolak Google. Kemungkinan
                  typo atau tidak aktif.
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-2 ml-7">
              {/* Button WA Prioritas (Minta Email Baru) */}
              <a
                href={`https://wa.me/?text=Halo ${name}, mohon maaf email undangan interview ke alamat "${email}" gagal terkirim (bounce). Boleh infokan alamat email alternatif yang aktif? Terima kasih.`}
                target="_blank"
                rel="noreferrer"
                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1"
              >
                <MessageCircle size={14} /> Minta Email Baru
              </a>
            </div>
          </div>
        ) : null}

        <DataRow label="Tanggal & Waktu" value={formattedDate || "-"} />
        <DataRow label="Metode" value={method || "-"} />
        <DataRow label="Link" value={link} isLink={!!link} />
        <DataRow label="Catatan" value={notes || "-"} />

        {/* Footer Info & Actions */}
        <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 flex flex-col gap-2">
          <div className="text-xs text-neutral-400">
            Tujuan:{" "}
            <strong
              className={
                emailStatus === "bounced" ? "text-red-500 line-through" : ""
              }
            >
              {email}
            </strong>
          </div>

          <div className="flex justify-between items-center">
            {/* ✅ BUTTON WA SELALU MUNCUL (Kiri Bawah) */}
            <Button
              onClick={() => window.open(waLink, "_blank")}
              className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white border-none shadow-sm gap-1.5 px-3"
            >
              <MessageCircle size={14} /> Chat via WhatsApp
            </Button>

            {/* Tombol Chat Minta Email (Pas Bounced) */}
            <Button
              onClick={() => window.open(waBouncedLink, "_blank")}
              className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white border-none shadow-sm gap-1"
            >
              <MessageCircle size={14} /> Minta Email Baru
            </Button>

            {/* Button Resend / Retry */}
            <Button
              onClick={handleResend}
              disabled={isResending}
              variant="ghost"
              className="h-7 text-[10px] px-2 text-neutral-500 hover:text-black hover:bg-neutral-100 border border-transparent hover:border-neutral-200"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin mr-1" /> Mengirim...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 mr-1" /> Kirim Ulang Email
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterviewFormMode({
  participantId,
  email,
  name,
}: {
  participantId: string;
  email: string;
  name: string;
}) {
  const scheduleInterview = useScheduleInterview(participantId);
  const isSubmitting = scheduleInterview.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<InterviewForm>({
    defaultValues: {
      interview_date: "",
      interview_method: "",
      interview_link: "",
      notes: "",
    },
  });

  const values = useWatch({ control });
  const hasInput = Object.values(values ?? {}).some(
    (v) => typeof v === "string" && v.trim().length > 0,
  );

  // --- FITUR TEST EMAIL ---
  const tryEmail = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Email peserta tidak valid!");
      return;
    }

    const toastId = toast.loading("Mencoba mengirim email test...", {
      id: "test-email",
    });

    try {
      const res = await fetch("/api/send-email/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: participantId,
          email: email,
          name: name,
          interview_date: new Date().toISOString(),
          interview_method: "TESTING (JANGAN DATANG)",
          interview_link: "https://google.com",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Server Error");
      }

      toast.loading("Email terkirim. Memverifikasi status (tunggu 5s)...", {
        id: toastId,
      });
      const status = await verifyEmailDelivery(email);

      if (status === "BOUNCED") {
        toast.error(
          (_t) => (
            <div className="flex flex-col gap-1">
              <span className="font-bold">TEST GAGAL! 🚨</span>
              <span className="text-xs">
                Email mental (bounced). Alamat <strong>{email}</strong> tidak
                aktif/typo.
              </span>
            </div>
          ),
          { id: toastId, duration: 6000 },
        );
      } else {
        toast.success("TEST SUKSES ✅ Email aman.", {
          id: toastId,
          duration: 4000,
        });
      }
    } catch (error: any) {
      console.error("Test Email Error:", error);
      toast.error(`Gagal: ${error.message || "Koneksi Error"}`, {
        id: toastId,
      });
    }
  };

  const onSubmit = handleSubmit((data) => {
    let interviewDate = data.interview_date?.trim() || "";
    if (!interviewDate) return;

    if (interviewDate.length === 16) interviewDate += ":00";
    if (
      !interviewDate.includes("Z") &&
      !interviewDate.match(/[+-]\d{2}:\d{2}/)
    ) {
      interviewDate += "+07:00";
    }

    // 1. SIMPAN KE DB
    scheduleInterview.mutate(
      {
        interview_date: interviewDate,
        interview_method: data.interview_method.trim(),
        interview_link: data.interview_link.trim(),
        notes: data.notes.trim(),
      },
      {
        onSuccess: async () => {
          // 2. KIRIM EMAIL
          const toastId = toast.loading("Jadwal tersimpan. Mengirim email...", {
            id: "email-process",
          });

          try {
            const res = await fetch("/api/send-email/interview", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: participantId,
                email: email,
                name: name,
                interview_date: interviewDate,
                interview_method: data.interview_method,
                interview_link: data.interview_link,
              }),
            });

            if (res.ok) {
              toast.loading("Memverifikasi penerimaan email (tunggu 5s)...", {
                id: toastId,
              });
              const status = await verifyEmailDelivery(email);

              if (status === "BOUNCED") {
                toast.error(
                  (_t) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">GAGAL TERKIRIM! 🚨</span>
                      <span className="text-xs">
                        Email salah/tidak ditemukan. Cek kotak merah di bawah.
                      </span>
                    </div>
                  ),
                  { id: toastId, duration: 8000 },
                );

                setTimeout(() => window.location.reload(), 3000);
              } else {
                toast.success("Sukses & Terkirim ✅", { id: toastId });
                setTimeout(() => window.location.reload(), 1500);
              }
            } else {
              toast.error("Jadwal tersimpan, tapi server gagal kirim email.", {
                id: toastId,
              });
              setTimeout(() => window.location.reload(), 2000);
            }
          } catch (error) {
            console.error("Email Error:", error);
            toast.error("Error koneksi saat mengirim email.", { id: toastId });
            setTimeout(() => window.location.reload(), 2000);
          }
        },
        onError: () => {
          toast.error("Gagal menyimpan jadwal interview.");
        },
      },
    );
  });

  return (
    <form
      onSubmit={onSubmit}
      className="relative border rounded-xl overflow-hidden bg-white shadow-sm"
    >
      <div className="bg-neutral-50 px-4 py-3 border-b font-semibold text-center flex justify-between items-center">
        <span className="font-medium text-neutral-700">
          Atur Jadwal Interview
        </span>
        <Button
          type="button"
          onClick={tryEmail}
          variant="outline"
          className="h-7 text-[10px] px-2 border-neutral-300 hover:bg-neutral-100 text-neutral-600 gap-1"
        >
          <AlertCircle size={10} /> Test Email
        </Button>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Tanggal & Waktu Interview <span className="text-red-500">*</span>
          </label>
          <Input
            type="datetime-local"
            {...register("interview_date", { required: "Wajib diisi" })}
            disabled={isSubmitting}
            className={errors.interview_date ? "border-red-500" : ""}
          />
          {errors.interview_date && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.interview_date.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Metode Interview
          </label>
          <Input
            placeholder="Online / Offline / Google Meet / Zoom dll"
            {...register("interview_method")}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Link Interview (jika online)
          </label>
          <Input
            placeholder="https://meet.google.com/xxx-yyy-zzz"
            {...register("interview_link")}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Catatan</label>
          <Textarea
            className="dark:bg-white dark:text-black"
            placeholder="Catatan tambahan untuk kandidat (opsional)"
            {...register("notes")}
            disabled={isSubmitting}
            rows={3}
          />
        </div>

        {hasInput && (
          <Button
            type="submit"
            className="w-full mt-2 bg-white hover:bg-gray-50 text-black hover:text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Simpan & Kirim Undangan"
            )}
          </Button>
        )}
      </div>

      {isSubmitting && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-opacity duration-300 px-6 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-black mb-4" />
          <p className="text-sm font-bold text-neutral-800">
            Sedang memproses...
          </p>
          <p className="text-xs text-neutral-500 mt-2 max-w-xs">
            Menyimpan jadwal & memverifikasi alamat email penerima.
          </p>
          <p className="text-[10px] text-neutral-400 mt-1">
            Mohon tunggu sebentar (~5 detik)
          </p>
        </div>
      )}
    </form>
  );
}

function DataRow({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value?: string | null;
  isLink?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-4 border-b pb-3 last:border-b-0 border-neutral-100">
      <span className="text-sm font-medium text-neutral-400 shrink-0 w-1/3">
        {label}
      </span>
      {isLink && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:underline break-all w-2/3 text-right"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm font-semibold text-neutral-800 text-right w-2/3 break-words">
          {value || "—"}
        </span>
      )}
    </div>
  );
}
