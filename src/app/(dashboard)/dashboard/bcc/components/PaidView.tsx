"use client";

import BreadcrumbGroup from "@/components/breadcrumb";
import Button from "@/components/buttons/button";
import ButtonLink from "@/components/links/button-link";
import Typography from "@/components/typography";
import { useCompetitionData } from "@/hooks/use-competition-data";
import { CompetitionMember } from "@/types/page/competition";
import {
  CheckCircle2,
  ExternalLink,
  X,
  XCircle,
  Copy,
  Clock,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import TeamSection from "./TeamSection";
import SubmissionSection from "@/app/events/register/[competition]/components/bcc/steps/Submission"; // 🚀 Import komponen baru
import { useSearchParams } from "next/navigation";
import StepIndicator from "../../repi/components/PaymentStepper";

import FileViewerModal from "@/app/(dashboard)/admin/events/shared/FileViewerModal";

import { useForm, FormProvider } from "react-hook-form";
import UploadFile from "@/app/events/register/[competition]/components/shared/FileUpload";
import { useUploadPaymentCompetition } from "@/hooks/use-payment-compe";
import { RiWhatsappFill } from "react-icons/ri";

const PaidViewSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto animate-pulse">
      <div className="bg-white rounded-xl h-[100px] w-full p-6 relative overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="bg-white p-10 mt-2 rounded-xl flex flex-col gap-4">
        <div className="w-full bg-gray-200 rounded-xl min-h-[300px]"></div>
      </div>
    </div>
  );
};

export default function PaidView() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team_id");
  const { data: teamData, isLoading: isLoadingTeamData } = useCompetitionData(
    teamId || null,
  );

  const isLoading = isLoadingTeamData;
  const status = teamData?.status || "PENDING_PAYMENT";

  // --- LOGIC STATUS PAYMENT ---
  const isPending = status === "PENDING_PAYMENT";
  const isRejected = status === "PAYMENT_REJECTED";
  const isVerifying = status === "PAYMENT_VERIFICATION";
  const isPaymentStage = isPending || isRejected || isVerifying;

  let activeStep = 1;
  if (isPending || isRejected) activeStep = 1;
  if (isVerifying) activeStep = 2;

  // --- LOGIC STATUS TAHAP LANJUTAN ---
  const isAbstractRejected = status === "ABSTRACT_REJECTED";
  const isSubmissionApproved = status === "ABSTRACT_VERIFICATION"; // Status setelah bayar
  const isApproved = !isPaymentStage;

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "BCC Competition", href: `/dashboard/bcc` },
  ];

  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(true); // Default open untuk submission

  const [openMembers, setOpenMembers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  // Form Provider untuk Submission Section
  const submissionMethods = useForm({
    defaultValues: {
      google_drive_link: teamData?.google_drive_link || "",
      drive_public_check: !!teamData?.google_drive_link, // Kalo udah ada link, asumsikan public check udh kecentang
    },
  });

  useEffect(() => {
    // Reset form value ketika data tim berhasil ke-fetch (buat ngisi input otomatis)
    if (teamData?.google_drive_link) {
      submissionMethods.reset({
        google_drive_link: teamData.google_drive_link,
        drive_public_check: true,
      });
    }
  }, [teamData, submissionMethods]);

  useEffect(() => {
    if (teamData?.members) {
      const initialState: { [key: string]: boolean } = {};
      teamData.members.forEach((member: CompetitionMember, index: number) => {
        initialState[member.id] = index === 0;
      });
      setOpenMembers(initialState);
    }
  }, [teamData?.members]);

  const toggleMember = (memberId: string) => {
    setOpenMembers((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  useEffect(() => {
    if (
      teamData &&
      (teamData.status === "ABSTRACT_VERIFICATION" ||
        teamData.status === "ABSTRACT_REJECTED")
    ) {
      const timer = setTimeout(() => setIsAnnouncementOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [teamData]);

  if (isLoading) return <PaidViewSkeleton />;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto z-10">
      <Toaster position="top-center" reverseOrder={false} />

      {selectedFileUrl && (
        <FileViewerModal
          fileUrl={selectedFileUrl}
          onClose={() => setSelectedFileUrl(null)}
        />
      )}

      {isAnnouncementOpen && (isSubmissionApproved || isAbstractRejected) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
          <div
            className="absolute inset-0"
            onClick={() => setIsAnnouncementOpen(false)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
            <button
              onClick={() => setIsAnnouncementOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            {isSubmissionApproved && (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <Typography className="text-2xl font-bold text-gray-900 mb-2">
                  Congratulations! 🎉
                </Typography>
                <div className="space-y-4 text-gray-600 mb-8">
                  <p>
                    Excellent work, <strong>{teamData?.team_name}</strong>!
                  </p>
                  <p className="text-sm">
                    Your payment has been <strong>APPROVED</strong>. Please
                    submit your Abstract and Originality Statement.
                  </p>
                  <p className="text-sm">
                    Please join our official WhatsApp group.
                  </p>
                </div>
                <a
                  href="https://chat.whatsapp.com/YOUR_WA_GROUP_LINK"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    Join WhatsApp Group <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </>
            )}
            {isAbstractRejected && (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <Typography className="text-2xl font-bold text-gray-900 mb-2">
                  Announcement
                </Typography>
                <div className="space-y-4 text-gray-600 mb-8 text-center">
                  <p>
                    Hello, <strong>{teamData?.team_name}</strong>.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                    After a thorough review, we regret to inform you that your
                    submission has <strong>not passed</strong> the selection
                    process this time.
                  </div>
                  <p className="text-sm">
                    Don&apos;t be discouraged! Keep innovating. 🚀
                  </p>
                </div>
                <Button
                  onClick={() => setIsAnnouncementOpen(false)}
                  variant="outline"
                  className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 h-12 rounded-xl font-medium"
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
        <div className="flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2">
            <Typography className="font-bold text-sm md:text-base text-gray-800">
              BCC Competition
            </Typography>
          </div>
          <Typography className="text-2xl md:text-3xl font-bold text-[#3454D1]">
            Welcome Team {teamData?.team_name}!
          </Typography>
          <BreadcrumbGroup items={BREADCRUMBS} />
        </div>
        <div className="absolute right-0 top-0 w-24 h-24 md:block hidden">
          <div className="w-0 h-0 border-t-[80px] border-t-red-500 border-l-[80px] border-l-transparent transform rotate-180 absolute top-0 right-0"></div>
          <div className='absolute top-0 right-0 w-[100px] h-[100px] bg-[url("/images/dashboard/futuretalk/Gambar kanan.svg")] bg-contain bg-no-repeat bg-right-top'></div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 mt-2 rounded-xl flex flex-col gap-6 shadow-sm">
        {isApproved && (
          <div className="w-full bg-[#3454D1] rounded-xl relative overflow-hidden min-h-[200px] md:min-h-[300px] flex items-center justify-center shadow-lg">
            <Image
              src="/images/competition/banner-bcc.png"
              alt="BCC Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <Typography className="text-2xl md:text-3xl font-bold text-[#0E467A] border-b pb-4">
          {isPending || isRejected
            ? "Complete Your Payment"
            : isVerifying
              ? "Verification Status"
              : "Dashboard"}
        </Typography>

        {(isPending || isRejected) && (
          <DashboardPaymentView
            data={teamData}
            isRejected={isRejected}
            activeStep={activeStep}
          />
        )}
        {isVerifying && <VerificationView activeStep={activeStep} />}

        {/* 🚀 SUBMISSION SECTION (MUNCUL JIKA APPROVED) 🚀 */}
        {isApproved && (
          <FormProvider {...submissionMethods}>
            <SubmissionSection
              isOpen={isSubmissionOpen}
              onToggle={() => setIsSubmissionOpen((prev) => !prev)}
              teamId={teamId || ""}
              isSubmitted={!!teamData?.google_drive_link} // Flag penentu udah diisi atau belum
            />
          </FormProvider>
        )}

        {isApproved && (
          <div className="flex flex-col gap-4 mt-6">
            <Typography className="text-xl font-bold text-[#0E467A] mb-2">
              Team Profile
            </Typography>
            {teamData?.members?.map(
              (member: CompetitionMember, index: number) => {
                const isLeader = member.type === "LEADER";
                return (
                  <TeamSection
                    key={member.id}
                    title={isLeader ? "Team Leader" : `Team Member ${index}`}
                    isOpen={openMembers[member.id] || false}
                    onToggle={() => toggleMember(member.id)}
                    onImageClick={(url: string) => setSelectedFileUrl(url)}
                    data={{
                      fullName: member.name || "-",
                      email: member.email || "-",
                      whatsapp: member.phone || "-",
                      university: teamData?.university || "-",
                      studentId: member.ktm || "-",
                      documentLink: member.ktm || "",
                      paymentLink: "",
                      submissionLink: "",
                    }}
                  />
                );
              },
            )}
          </div>
        )}
      </div>
    </div>
  );
}
// ==========================================
// 1. PAYMENT VIEW
// ==========================================
function DashboardPaymentView({
  data,
  isRejected,
  activeStep,
}: { data: any; isRejected?: boolean; activeStep: number }) {
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
      <div className="w-full flex flex-col gap-6">
        {/* STEPPER */}
        <div className="bg-[#3454D1] rounded-2xl py-8 px-4 shadow-inner mb-4">
          <StepIndicator activeStep={activeStep} />
        </div>

        {/* ALERT REJECTED */}
        {isRejected && (
          <div className="border border-red-50 p-4 md:p-5 rounded-2xl flex items-start gap-3 shadow-sm bg-red-50">
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
                Bukti pembayaran Anda sebelumnya ditolak. Pastikan nominal
                transfer sesuai kode unik dan gambar tidak terpotong. Silakan
                unggah ulang.
              </Typography>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-dashed border-gray-300 shadow-sm text-center">
          <Typography
            font="Sora"
            weight="bold"
            className="text-base md:text-lg text-gray-900 mb-4"
          >
            Nominal Amount to be Paid:
          </Typography>
          <div
            onClick={() => handleCopy(totalPrice.toString(), "Total Price")}
            className="bg-[#3454D1] text-white font-bold py-3 px-8 rounded-2xl inline-block text-xl mb-4 cursor-pointer hover:bg-[#2841a3] transition-all active:scale-95 shadow-md"
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
              className="bg-white border border-[#3454D1] rounded-xl py-4 px-5 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Typography
                font="Sora"
                weight="semibold"
                className="text-sm md:text-base text-[#3454D1]"
              >
                5726053070 a.n. Chaerine Zahra Komala P - BCA
              </Typography>
              <Copy className="text-[#3454D1] shrink-0 ml-2" size={18} />
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

        <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
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
            className="w-full md:w-auto py-4 px-10 rounded-2xl bg-[#3454D1] text-white font-bold hover:bg-[#2841a3] shadow-lg border-none"
          >
            {isPending ? "Uploading..." : "Submit Payment Proof"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}

// ==========================================
// 2. VERIFICATION VIEW
// ==========================================
function VerificationView({ activeStep }: { activeStep: number }) {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* STEPPER */}
      <div className="bg-[#3454D1] rounded-2xl py-8 px-4 shadow-inner mb-4">
        <StepIndicator activeStep={activeStep} />
      </div>

      <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center w-full bg-gray-50 rounded-3xl border border-gray-200 shadow-sm">
        <div className="bg-[#3454D1] bg-opacity-10 p-6 rounded-full mb-6">
          <Clock className="w-16 h-16 md:w-20 md:h-20 text-[#3454D1] animate-pulse" />
        </div>
        <Typography
          variant="h3"
          font="Sora"
          weight="bold"
          className="text-[#3454D1] mb-4 text-2xl md:text-3xl"
        >
          Menunggu Verifikasi
        </Typography>
        <Typography className="text-gray-600 max-w-lg text-sm md:text-base px-4 leading-relaxed">
          Terima kasih telah melakukan pembayaran! Tim kami sedang memverifikasi
          bukti pembayaran Anda dalam waktu{" "}
          <span className="font-bold text-gray-800">1x24 jam kerja</span>.
        </Typography>
      </div>
    </div>
  );
}
