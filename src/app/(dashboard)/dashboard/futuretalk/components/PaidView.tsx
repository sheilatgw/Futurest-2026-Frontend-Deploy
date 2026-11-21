"use client";

import BreadcrumbGroup from "@/components/breadcrumb";
import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { useMinicaseData } from "@/hooks/use-minicase-data";
import {
  useMinicaseAbstract,
  useMinicaseProposal,
} from "@/hooks/use-minicase-upload";
import useAuthStore from "@/stores/use-auth-store";
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  Contact,
  ExternalLink,
  FileText,
  Loader2,
  RefreshCw,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import TeamSection from "./TeamSection";

// --- 1. KOMPONEN SKELETON ---
const PaidViewSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto animate-pulse">
      <div className="bg-white rounded-xl h-[100px] w-full p-6 relative overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-xl h-[140px] w-full p-6 relative overflow-hidden">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="bg-white p-10 mt-2 rounded-xl flex flex-col gap-4">
        <div className="w-full bg-gray-200 rounded-xl min-h-[300px]"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="h-[120px] bg-gray-200 rounded-xl"></div>
          <div className="h-[120px] bg-gray-200 rounded-xl"></div>
        </div>
        <div className="h-[200px] bg-gray-100 rounded-xl border-2 border-dashed border-gray-200"></div>
      </div>
    </div>
  );
};

// --- HELPER: EXTRACT FILENAME ---
const getFileNameFromUrl = (url: string) => {
  if (!url) return "Document.pdf";
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return decodeURIComponent(fileName); // Decode biar spasi/karakter aneh kebaca bener
  } catch (_error) {
    return "Document.pdf";
  }
};

// --- 2. MAIN COMPONENT ---
export default function PaidView() {
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const participantId =
    user?.minicase_info?.participant_info?.participant_id || null;

  // Fetch Data
  const { data: teamData, isLoading, refetch } = useMinicaseData(participantId);

  // Hook Upload Abstract
  const { mutate: uploadAbstract, isPending: isUploadingAbstract } =
    useMinicaseAbstract(refetch);

  // Hook Upload Proposal
  const { mutate: uploadProposal, isPending: isUploadingProposal } =
    useMinicaseProposal
      ? useMinicaseProposal(refetch)
      : {
          mutate: () => console.log("Upload proposal hook not found"),
          isPending: false,
        };

  const status = teamData?.status || "";

  // 🔥 LOGIC: Definition of Phases
  const isProposalStage = [
    "ABSTRACT_APPROVED",
    "PROPOSAL_VERIFICATION",
    "PROPOSAL_APPROVED",
    "PROPOSAL_REJECTED",
  ].includes(status);

  // Abstract Rejected (End Game)
  const isAbstractRejected = status === "ABSTRACT_REJECTED";

  // --- LOGIC DATES ---
  const ABSTRACT_DEADLINE = new Date("2026-01-18T23:59:59");
  const SUBMISSION_OPEN = new Date("2026-01-23T00:00:00");
  const SUBMISSION_DEADLINE = new Date("2026-01-26T23:59:59");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAbstractDeadlinePassed, setIsAbstractDeadlinePassed] =
    useState(false);

  // State khusus submission proposal
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [isSubmissionClosed, setIsSubmissionClosed] = useState(false);

  // Update Waktu Realtime
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      setCurrentDate(now);

      // Logic Abstract
      setIsAbstractDeadlinePassed(now > ABSTRACT_DEADLINE);

      // Logic Submission Proposal
      setIsSubmissionOpen(now >= SUBMISSION_OPEN);
      setIsSubmissionClosed(now > SUBMISSION_DEADLINE);
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- DYNAMIC COUNTDOWN TARGET ---
  let targetCountdownDate = ABSTRACT_DEADLINE;
  let countdownLabel = "Abstract Submission Deadline";

  if (isProposalStage) {
    if (!isSubmissionOpen) {
      targetCountdownDate = SUBMISSION_OPEN;
      countdownLabel = "Submission Opens In";
    } else {
      targetCountdownDate = SUBMISSION_DEADLINE;
      countdownLabel = "Submission Deadline";
    }
  }

  const calculateTimeLeft = () => {
    const difference = +targetCountdownDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, isProposalStage, isSubmissionOpen]);

  // --- HELPERS VARIABLES ---
  const isUploading = isProposalStage
    ? isUploadingProposal
    : isUploadingAbstract;

  // File logic
  const existingAbstract = teamData?.study_case_abstract_file;
  const existingProposal = teamData?.minicase_proposal_file;
  const displayFile = isProposalStage ? existingProposal : existingAbstract;

  // --- HANDLERS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLocalError(null);

    if (!file) return;
    if (!participantId) {
      toast.error("Session expired. Please refresh.");
      return;
    }

    // Validasi
    if (file.type !== "application/pdf") {
      setLocalError("Invalid file type. Please upload a .pdf file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setLocalError("File size exceeds 10MB limit.");
      return;
    }

    // Logic Upload
    if (isProposalStage) {
      // Upload Proposal
      if (!isSubmissionOpen) {
        toast.error("Submission period has not started yet.");
        return;
      }
      if (isSubmissionClosed) {
        toast.error("Submission period has ended.");
        return;
      }
      uploadProposal({ participantId, file });
    } else {
      // Upload Abstract
      if (isAbstractDeadlinePassed) {
        setLocalError("Submission period has ended.");
        return;
      }
      uploadAbstract({ participantId, file });
    }
  };

  const handleBoxClick = () => {
    // Mencegah klik jika sedang upload
    if (isUploading) return;

    // Jika file sudah ada, user harus klik tombol "Re-upload" secara eksplisit
    if (displayFile) return;

    if (isProposalStage) {
      // Proposal Mode
      if (isSubmissionOpen && !isSubmissionClosed) {
        fileInputRef.current?.click();
      }
    } else {
      // Abstract Mode
      if (!isAbstractDeadlinePassed) {
        fileInputRef.current?.click();
      }
    }
  };

  const handleReuploadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Penting: Jangan trigger event parent
    fileInputRef.current?.click();
  };

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "FutureTalk x Minicase", href: `/dashboard/futuretalk` },
  ];

  // UI States
  const [openLeader, setOpenLeader] = useState(true);
  const [openMember1, setOpenMember1] = useState(false);
  const [openMember2, setOpenMember2] = useState(false);
  const [isCPOpen, setIsCPOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (
      teamData &&
      (teamData.status === "ABSTRACT_APPROVED" ||
        teamData.status === "ABSTRACT_REJECTED")
    ) {
      const timer = setTimeout(() => setIsAnnouncementOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [teamData]);

  if (isLoading) return <PaidViewSkeleton />;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- MODAL ANNOUNCEMENT --- */}
      {isAnnouncementOpen &&
        (status === "ABSTRACT_APPROVED" || isAbstractRejected) && (
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
              {status === "ABSTRACT_APPROVED" && (
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
                      Your abstract has been <strong>APPROVED</strong>. Please
                      prepare for the next stage (Proposal Submission).
                    </p>
                    <p className="text-sm">
                      Please join our official WhatsApp group.
                    </p>
                  </div>
                  <a
                    href="https://chat.whatsapp.com/JuBjkPhVZFaIeRnVbvPFo4"
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
                      abstract has <strong>not passed</strong> the selection
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

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
        <div className="flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2">
            <Typography className="font-bold text-sm md:text-base text-gray-800">
              FutureTalk x Minicase
            </Typography>
          </div>
          <Typography className="text-2xl md:text-3xl font-bold text-[#0E467A]">
            Welcome Team {teamData?.team_name}!
          </Typography>
          <BreadcrumbGroup items={BREADCRUMBS} />
        </div>
        <div className="absolute right-0 top-0 w-24 h-24 md:block hidden">
          <div className="w-0 h-0 border-t-[80px] border-t-red-500 border-l-[80px] border-l-transparent transform rotate-180 absolute top-0 right-0"></div>
          <div className='absolute top-0 right-0 w-[100px] h-[100px] bg-[url("/images/dashboard/futuretalk/Gambar kanan.svg")] bg-contain bg-no-repeat bg-right-top'></div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="bg-white p-10 mt-2 rounded-xl flex flex-col gap-4">
        {/* BANNER & GUIDEBOOK */}
        <div className="w-full bg-[url(/images/dashboard/futuretalk/bg-banner.svg)] bg-cover rounded-xl relative overflow-hidden text-white min-h-[300px] flex flex-col items-center justify-center p-6 md:p-10 text-center shadow-lg">
          <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
          <Image
            src="/images/dashboard/futuretalk/banner-content.svg"
            alt="content"
            width={1000}
            height={1000}
          />
          <div className="flex flex-col md:flex-row gap-4 mt-8 z-10 w-full max-w-lg justify-center relative">
            <a
              href="https://drive.google.com/file/d/1L1FLrPgxbUCQCiDrARHwOpTf4kW0yPHX/view?usp=sharing"
              className="w-full"
              target="_blank"
            >
              <Button
                className="w-full flex gap-2 items-center border-2 border-blue-600 font-semibold text-blue-600"
                variant="outline"
              >
                <BookOpen className="w-4 h-4" /> Guidebook
              </Button>
            </a>
            <div className="w-full">
              <button
                onClick={() => setIsCPOpen(true)}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Contact className="w-5 h-5" /> Contact Person
              </button>
            </div>
          </div>

          {/* Modal CP */}
          {isCPOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
              <div
                className="absolute inset-0"
                onClick={() => setIsCPOpen(false)}
              ></div>
              <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                  <Typography className="text-xl font-bold text-gray-800">
                    Contact Person
                  </Typography>
                  <button
                    onClick={() => setIsCPOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/62895401578860"
                    target="_blank"
                    className="flex items-center gap-4 p-4 border border-gray-100 bg-gray-50 hover:bg-green-50 rounded-xl transition-all"
                  >
                    <div className="w-10 h-10 bg-white border border-gray-200 text-green-600 rounded-full flex items-center justify-center">
                      <Contact size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">CP 1</span>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/628973900016"
                    target="_blank"
                    className="flex items-center gap-4 p-4 border border-gray-100 bg-gray-50 hover:bg-green-50 rounded-xl transition-all"
                  >
                    <div className="w-10 h-10 bg-white border border-gray-200 text-green-600 rounded-full flex items-center justify-center">
                      <Contact size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">CP 2</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- COUNTDOWN SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-[url(/images/dashboard/futuretalk/countdown.svg)] bg-cover bg-right rounded-xl p-6 text-white relative overflow-hidden min-h-[120px] flex flex-col justify-center shadow-md">
            <Typography className="text-xs md:text-sm text-white/80 mb-2 uppercase tracking-wide">
              {countdownLabel}
            </Typography>
            <div className="flex gap-4 items-baseline">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] text-white/70">Days</span>
              </div>
              <span className="text-xl md:text-2xl font-light text-white/50">
                :
              </span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] text-white/70">Hour</span>
              </div>
              <span className="text-xl md:text-2xl font-light text-white/50">
                :
              </span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] text-white/70">Minutes</span>
              </div>
              <span className="text-xl md:text-2xl font-light text-white/50">
                :
              </span>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-[#FFCE21]">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] text-white/70">Seconds</span>
              </div>
            </div>
          </div>
          <div className="bg-[url(/images/dashboard/futuretalk/timer.svg)] bg-cover bg-right rounded-xl p-6 text-white relative overflow-hidden min-h-[120px] flex flex-col justify-center shadow-md">
            <Typography className="text-xs md:text-sm text-white/80 mb-1 uppercase tracking-wide">
              Target Deadline
            </Typography>
            <Typography className="text-2xl text-white md:text-3xl font-bold">
              {isProposalStage ? "January 26th, 2026" : "January 18th, 2026"}
            </Typography>
          </div>
        </div>

        {/* --- DYNAMIC UPLOAD SECTION --- */}
        <div className="w-full">
          <div className="bg-white p-1 rounded-xl shadow-sm">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
              onClick={(e) => {
                e.currentTarget.value = "";
              }}
              disabled={isUploading}
            />

            <div
              onClick={handleBoxClick}
              className={`
                    relative border-2 border-dashed rounded-xl min-h-[220px] flex flex-col items-center justify-center gap-4 transition-all
                    ${
                      // Disable styling jika belum waktunya atau sudah lewat
                      (isProposalStage && !isSubmissionOpen) ||
                      (isProposalStage && isSubmissionClosed) ||
                      (!isProposalStage && isAbstractDeadlinePassed)
                        ? "bg-gray-100 border-gray-300 cursor-not-allowed"
                        : "bg-[#F9FAFB] border-gray-300"
                    }
                    ${
                      // Hover styling hanya jika belum ada file atau upload mode
                      !displayFile && !isUploading
                        ? "cursor-pointer hover:bg-green-50/50"
                        : ""
                    }
                `}
            >
              <span className="absolute top-4 left-4 text-xs font-semibold text-gray-700 flex items-center gap-2">
                {isProposalStage
                  ? "Pitch Deck Submission"
                  : "Abstract Document"}
                <span className="text-red-500">*</span>
              </span>

              {/* LOGIKA TAMPILAN KONTEN BOX */}
              {isUploading ? (
                // 1. STATE: SEDANG UPLOAD
                <div className="flex flex-col items-center text-blue-600 animate-pulse">
                  <Loader2 className="w-12 h-12 mb-2 animate-spin" />
                  <span className="text-sm font-semibold">
                    Uploading {isProposalStage ? "Proposal" : "Abstract"}...
                  </span>
                </div>
              ) : displayFile ? (
                // 2. STATE: FILE SUDAH ADA (VIEW & RE-UPLOAD)
                <div className="flex flex-col items-center text-center p-6 w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <Typography className="font-bold text-gray-800 text-lg">
                    {isProposalStage && existingProposal
                      ? "Proposal Submitted!"
                      : "Abstract Submitted!"}
                  </Typography>
                  <p className="text-sm text-gray-500 mt-1 mb-2">
                    Your file has been uploaded securely.
                  </p>

                  {/* 🔥 SHOW FILENAME HERE 🔥 */}
                  <p className="text-sm font-medium text-gray-900 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 mb-6 max-w-full truncate">
                    {getFileNameFromUrl(displayFile)}
                  </p>

                  <div className="flex gap-3 w-full justify-center">
                    {/* BUTTON 1: VIEW FILE (PASTI ADA) */}
                    <a
                      href={displayFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4 mr-2" /> View File
                      </Button>
                    </a>

                    {/* BUTTON 2: RE-UPLOAD (KONDISIONAL) */}
                    {isProposalStage ? (
                      // Proposal Mode: Cek Waktu Submission
                      isSubmissionOpen && !isSubmissionClosed ? (
                        <Button
                          variant="primary"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={handleReuploadClick}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" /> Re-upload
                        </Button>
                      ) : null
                    ) : // Abstract Mode: Cek Waktu Abstract
                    !isAbstractDeadlinePassed ? (
                      <Button
                        variant="primary"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleReuploadClick}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" /> Re-upload
                      </Button>
                    ) : null}
                  </div>
                </div>
              ) : (
                // 3. STATE: BELUM ADA FILE (UPLOAD PERTAMA)
                <div className="flex flex-col items-center justify-center text-gray-400 text-center">
                  {isProposalStage ? (
                    !isSubmissionOpen ? (
                      <>
                        <Loader2 className="w-12 h-12 mb-3 text-orange-400 animate-pulse" />
                        <Typography className="font-semibold text-gray-700">
                          Submission Opens Soon
                        </Typography>
                        <p className="text-xs text-gray-500 mt-1">
                          Please wait until Jan 23rd.
                        </p>
                      </>
                    ) : isSubmissionClosed ? (
                      <>
                        <X className="w-16 h-16 mb-4 text-gray-300" />
                        <Typography className="font-bold text-gray-500 text-lg">
                          Submission Closed
                        </Typography>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-12 h-12 mb-3 text-green-800" />
                        <Typography className="font-semibold text-gray-700">
                          Click to upload Proposal
                        </Typography>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF format only (Max 5MB)
                        </p>
                      </>
                    )
                  ) : isAbstractDeadlinePassed ? (
                    <>
                      <X className="w-16 h-16 mb-4 text-gray-300" />
                      <Typography className="font-bold text-gray-500 text-lg">
                        Submission Closed
                      </Typography>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-12 h-12 mb-3 text-green-800" />
                      <Typography className="font-semibold text-gray-700">
                        Click to upload Abstract
                      </Typography>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF format only (Max 5MB)
                      </p>
                    </>
                  )}
                </div>
              )}

              {localError && (
                <div className="absolute bottom-4 bg-red-100 text-red-800 px-4 py-2 rounded-full text-xs font-semibold flex items-center animate-in slide-in-from-bottom-2">
                  <AlertCircle className="w-3 h-3 mr-2" /> {localError}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- TEAM PROFILE --- */}
        <div className="flex flex-col gap-4">
          <Typography className="text-2xl md:text-3xl font-bold text-[#0E467A]">
            Team Profile
          </Typography>
          <TeamSection
            title="Team Leader"
            isOpen={openLeader}
            onToggle={() => setOpenLeader(!openLeader)}
            data={{
              fullName: teamData?.team_leader_name || "-",
              email: teamData?.team_leader_email || "-",
              whatsapp: teamData?.team_leader_phone || "-",
              university: teamData?.university || "-",
              studentId: teamData?.team_leader_ktm || "-",
              documentLink: "",
              paymentLink: "",
              submissionLink: "",
            }}
          />
          {teamData?.team_member_2_name && (
            <TeamSection
              title="Team Member 1"
              isOpen={openMember1}
              onToggle={() => setOpenMember1(!openMember1)}
              data={{
                fullName: teamData?.team_member_2_name || "-",
                email: teamData?.team_member_2_email || "-",
                university: teamData?.university || "-",
                studentId: teamData?.team_member_2_ktm || "-",
              }}
            />
          )}
          {teamData?.team_member_3_name && (
            <TeamSection
              title="Team Member 2"
              isOpen={openMember2}
              onToggle={() => setOpenMember2(!openMember2)}
              data={{
                fullName: teamData?.team_member_3_name || "-",
                email: teamData?.team_member_3_email || "-",
                university: teamData?.university || "-",
                studentId: teamData?.team_member_3_ktm || "-",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
