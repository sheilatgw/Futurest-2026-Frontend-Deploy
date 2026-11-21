"use client";

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { ChevronDown, ChevronUp, Copy, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import StepIndicator from "../components/PaymentStepper";
import { TeamDetail } from "@/hooks/use-team-detail";
import { TeamPayment } from "@/hooks/use-payment-team-detail";

// Imports for Payment View
import { useForm, FormProvider } from "react-hook-form";
import UploadFile from "@/app/events/register/[competition]/components/shared/FileUpload";
import Button from "@/components/buttons/button";
import ButtonLink from "@/components/links/button-link";
import { useUploadPaymentCompetition } from "@/hooks/use-payment-compe";
import toast from "react-hot-toast";
import { RiWhatsappFill } from "react-icons/ri";
import SubmissionSection from "@/app/events/register/[competition]/components/repi/steps/SubmissionStep"; // Sesuaikan path jika beda folder

interface TeamProfileProps {
  repiTeamData?: TeamDetail | any;
  repiPaymentData?: TeamPayment | any;
}

export default function TeamProfile({
  repiTeamData,
  repiPaymentData,
}: TeamProfileProps) {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(true);

  // --- LOGIC STATUS ---
  const currentStatus = repiTeamData?.status || "PENDING_PAYMENT";
  const isPending = currentStatus === "PENDING_PAYMENT";
  const isRejected = currentStatus === "PAYMENT_REJECTED";
  const isVerifying = currentStatus === "PAYMENT_VERIFICATION";

  // Flag ini mengecek apakah status sekarang masih di tahap pembayaran (1, 2, atau 3)
  const isPaymentStage = isPending || isRejected || isVerifying;

  // Kita anggap semua status selain urusan payment sudah boleh melihat profil tim.
  const isApproved = !isPaymentStage;

  // Menentukan activeStep untuk indicator
  let activeStep = 1;
  if (isPending || isRejected) activeStep = 1; // Step 1: Upload bukti bayar
  if (isVerifying) activeStep = 2; // Step 2: Menunggu Verifikasi

  const leader = repiTeamData?.members?.find((m: any) => m.type === "LEADER");
  const members =
    repiTeamData?.members?.filter((m: any) => m.type !== "LEADER") ?? [];

  // --- FORM PROVIDER UNTUK SUBMISSION SECTION ---
  const submissionMethods = useForm({
    defaultValues: {
      google_drive_link: repiTeamData?.google_drive_link || "",
      drive_public_check: !!repiTeamData?.google_drive_link,
    },
  });

  useEffect(() => {
    if (repiTeamData?.google_drive_link) {
      submissionMethods.reset({
        google_drive_link: repiTeamData.google_drive_link,
        drive_public_check: true,
      });
    }
  }, [repiTeamData, submissionMethods]);

  return (
    <div className="flex justify-center px-4 pb-8">
      <div className="w-full bg-white rounded-xl p-8 md:p-12 z-[999]">
        {/* --- BANNER HEADER --- */}
        {/* Jika masih di tahap Payment, tampilkan Banner Polkadot dengan StepIndicator */}
        {isPaymentStage ? (
          <div className="relative w-full h-[147px] md:h-[240px] rounded-[9.78px] overflow-hidden bg-[#0B8457] py-16">
            <NextImage
              width={1000}
              height={1000}
              src="/dashboard/bg-polkadot.png"
              alt="Background"
              className="absolute inset-0 object-cover"
            />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
              <Typography
                font="Titillium"
                className="text-[20px] md:text-[34px] text-[#FAFAFA] text-center font-normal"
              >
                Payment Status
              </Typography>
              <StepIndicator activeStep={activeStep} />
            </div>
          </div>
        ) : (
          /* Jika sudah Approved (Abstrak, Proposal, dll), tampilkan Banner Default tanpa StepIndicator */
          <div className="relative w-full h-auto rounded-[9.78px] overflow-hidden bg-[#0B8457] flex justify-center items-center">
            <NextImage
              width={1080}
              height={350}
              src="/dashboard/repi-banner.png"
              alt="Background"
            />
          </div>
        )}

        {/* --- DYNAMIC TITLE --- */}
        <div className="py-6 border-b border-gray-100 mb-6">
          <Typography
            font="Titillium"
            className="text-[24px] md:text-[40px] font-bold text-[#0E467A]"
          >
            {isPending || isRejected
              ? "Complete Your Payment"
              : isVerifying
                ? "Verification Status"
                : "Dashboard"}
          </Typography>
        </div>

        {/* --- CONDITIONAL RENDERING CONTENT --- */}
        {(isPending || isRejected) && (
          <DashboardPaymentView data={repiTeamData} isRejected={isRejected} />
        )}
        {isVerifying && <VerificationView />}

        {/* 🚀 MUNCULIN SUBMISSION KALO PAYMENT UDAH BERES 🚀 */}
        {isApproved && (
          <FormProvider {...submissionMethods}>
            <SubmissionSection
              isOpen={isSubmissionOpen}
              onToggle={() => setIsSubmissionOpen(!isSubmissionOpen)}
              teamId={repiTeamData?.id}
              isSubmitted={!!repiTeamData?.google_drive_link} // Read-only klo linknya udah diisi
            />
          </FormProvider>
        )}

        {/* --- PROFIL TIM --- */}
        {isApproved && (
          <div className="flex flex-col gap-4 mt-6">
            <Typography className="text-xl font-bold text-[#0E467A] mb-2">
              Team Profile
            </Typography>
            {leader && (
              <TeamSection
                title="Team Leader"
                isOpen={isOpen1}
                onToggle={() => setIsOpen1((prev) => !prev)}
                data={{
                  fullName: leader.name,
                  email: leader.email,
                  whatsapp: leader.phone,
                }}
              />
            )}
            {members.map((member: any, index: number) => (
              <TeamSection
                key={member.id || index}
                title={`Team Member ${index + 1}`}
                isOpen={index === 0 ? isOpen2 : isOpen3}
                onToggle={() => {
                  if (index === 0) setIsOpen2((prev) => !prev);
                  if (index === 1) setIsOpen3((prev) => !prev);
                }}
                data={{
                  fullName: member.name,
                  email: member.email,
                  whatsapp: member.phone,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 1. COMPONENT: PAYMENT VIEW (PENDING & REJECTED)
// ==========================================
function DashboardPaymentView({
  data,
  isRejected,
}: { data: any; isRejected?: boolean }) {
  const totalPrice = data?.total_price || 90000;
  const uniqueCode = data?.unique_code || 0;
  const teamId = data?.id;

  const methods = useForm();
  const paymentProofFile = methods.watch("leader_payment_proof");

  const { mutate: uploadProof, isPending } = useUploadPaymentCompetition(() => {
    toast.success("Payment proof uploaded successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });

  const handleUpload = () => {
    if (!teamId) return toast.error("Team ID not found");

    const fileToUpload =
      paymentProofFile instanceof File
        ? paymentProofFile
        : paymentProofFile?.[0];

    if (!fileToUpload)
      return toast.error("Please upload the payment proof first");

    uploadProof({ teamId, file: fileToUpload });
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full">
        {/* --- ALERT REJECTED --- */}
        {isRejected && (
          <div className="bg-red-50 border border-red-200 p-4 md:p-5 rounded-2xl mb-8 flex items-start gap-3 shadow-sm">
            <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={24} />
            <div>
              <Typography
                font="Sora"
                weight="bold"
                className="text-red-800 text-sm md:text-base mb-1"
              >
                Payment Rejected!
              </Typography>
              <Typography className="text-red-700 text-xs md:text-sm leading-relaxed">
                Bukti pembayaran Anda sebelumnya ditolak oleh admin. Pastikan
                nominal transfer sesuai hingga 3 digit terakhir (kode unik) dan
                gambar bukti transfer tidak terpotong. Silakan unggah ulang
                bukti pembayaran yang valid.
              </Typography>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-dashed border-gray-300 shadow-sm mb-8 text-center">
          <Typography
            font="Sora"
            weight="bold"
            className="text-base md:text-lg text-gray-900 mb-4"
          >
            Nominal Amount to be Paid:
          </Typography>

          <div
            onClick={() => handleCopy(totalPrice.toString(), "Total Price")}
            className="bg-[#0F936D] text-white font-bold py-3 px-8 rounded-2xl inline-block text-xl mb-4 cursor-pointer hover:bg-green-700 transition-all active:scale-95 shadow-md"
          >
            <Typography
              font="Sora"
              weight="bold"
              className="text-white flex items-center gap-2 select-none"
            >
              Rp {totalPrice.toLocaleString("id-ID")} <Copy size={18} />
            </Typography>
          </div>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Kode Unik Tim : <strong>{uniqueCode}</strong>
          </p>

          <Typography font="Sora" weight="bold" className="text-gray-900 mb-4">
            Please make payment using the account number below:
          </Typography>

          <div className="space-y-4 md:space-y-4 max-w-xl mx-auto">
            <div
              onClick={() => handleCopy("1440023760157", "Mandiri Number")}
              className="bg-white border border-[#0F936D] rounded-xl py-4 px-5 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Typography
                font="Sora"
                weight="semibold"
                className="text-sm md:text-base text-[#0F936D]"
              >
                5726053070 a.n. Chaerine Zahra Komala P - BCA
              </Typography>
              <Copy className="text-[#0F936D] shrink-0 ml-2" size={18} />
            </div>
          </div>

          <div className="mt-8">
            <Typography
              font="Sora"
              weight="bold"
              className="text-gray-900 mb-3 text-sm md:text-base"
            >
              Need Help? Contact Person
            </Typography>
            <div className="flex flex-col gap-4 max-w-xs mx-auto justify-center">
              <ButtonLink
                href="https://wa.me/6282132060411"
                target="_blank"
                size="lg"
                className="bg-[#3454D1] rounded-xl hover:bg-[#2841a3] text-sm md:text-base border-none"
              >
                Albir (+62 821-3206-0411){" "}
                <RiWhatsappFill size={22} className="ml-2" />
              </ButtonLink>
              <ButtonLink
                href="https://wa.me/6281359411106"
                target="_blank"
                size="lg"
                className="bg-[#3454D1] rounded-xl hover:bg-[#2841a3] text-sm md:text-base border-none"
              >
                Afif (+62 813-5941-1106){" "}
                <RiWhatsappFill size={22} className="ml-2" />
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm mb-8">
          <UploadFile
            variant="md"
            name="leader_payment_proof"
            title={
              isRejected ? "Re-upload Payment Proof" : "Upload Payment Proof"
            }
            subLabel="Please upload proof of payment clearly"
            isRequired
            supportFiles={[".png", ".jpg", ".pdf"]}
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleUpload}
            disabled={isPending}
            className="w-full md:w-auto py-4 px-10 rounded-2xl bg-[#0F936D] text-white font-bold hover:bg-green-700 shadow-lg"
          >
            {isPending ? "Uploading..." : "Submit Payment Proof"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}

// ==========================================
// 2. COMPONENT: VERIFICATION VIEW
// ==========================================
function VerificationView() {
  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center w-full bg-gray-50 rounded-3xl border border-gray-200 shadow-sm">
      <div className="bg-[#FFCE21] bg-opacity-20 p-6 rounded-full mb-6">
        <Clock className="w-16 h-16 md:w-20 md:h-20 text-[#D4A000] animate-pulse" />
      </div>
      <Typography
        variant="h3"
        font="Sora"
        weight="bold"
        className="text-[#0E467A] mb-4 text-2xl md:text-3xl"
      >
        Menunggu Verifikasi
      </Typography>
      <Typography className="text-gray-600 max-w-lg text-sm md:text-base px-4 leading-relaxed">
        Terima kasih telah melakukan pembayaran! Tim kami sedang memverifikasi
        bukti pembayaran Anda. Proses ini biasanya membutuhkan waktu{" "}
        <span className="font-bold text-gray-800">1x24 jam kerja</span>. Mohon
        cek dashboard ini secara berkala.
      </Typography>
    </div>
  );
}

// ==========================================
// 3. COMPONENT: TEAM SECTION (PROFIL TIM)
// ==========================================
interface TeamSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  data: {
    fullName: string;
    email: string;
    whatsapp?: string;
  };
}

function TeamSection({ title, isOpen, onToggle, data }: TeamSectionProps) {
  return (
    <div className="mb-2 shadow-sm rounded-2xl border border-gray-100">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center px-6 py-4 bg-[#0B8457] transition-all duration-300 ${
          isOpen ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <Typography className="text-white font-bold text-lg md:text-xl">
          {title}
        </Typography>
        {isOpen ? (
          <ChevronUp className="text-white" />
        ) : (
          <ChevronDown className="text-white" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#f8f9fa] p-6 rounded-b-2xl border-x border-b border-gray-200">
          <InfoRow label="Full Name" value={data.fullName} />
          <InfoRow label="Email" value={data.email} />
          {data.whatsapp && (
            <InfoRow label="Whatsapp Number" value={data.whatsapp} />
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPONENT: INFO ROW
// ==========================================
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-gray-200 last:border-0 md:grid md:grid-cols-[160px_12px_1fr] md:gap-x-3 md:gap-y-0">
      <Typography className="font-semibold text-gray-700">{label}</Typography>
      <Typography className="hidden md:block text-gray-500">:</Typography>
      <Typography className="text-gray-900 leading-relaxed break-all [overflow-wrap:anywhere] font-medium">
        {value || "-"}
      </Typography>
    </div>
  );
}
