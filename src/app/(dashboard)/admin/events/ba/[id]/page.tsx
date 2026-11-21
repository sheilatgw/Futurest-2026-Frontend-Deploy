"use client";
import BreadcrumbGroup from "@/components/breadcrumb";

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useApproveBrandAmbassador,
  useGetBrandAmbassadorParticipant,
  useRejectBrandAmbassador,
  useUpdateParticipantStatus,
} from "@/hooks/use-ba";
import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import { addHours, isAfter } from "date-fns";
import { toZonedTime } from "date-fns-tz"; // untuk handle timezone WIB
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  X,
  XCircle,
} from "lucide-react";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { InterviewSection } from "../components/Interview";
import { StatusBadge } from "./components/status-badge";

interface MemberData {
  name: string;
  email: string;
  phone: string;
  instagram_handle: string;
  student_type: "UNIVERSITY" | "HIGH_SCHOOL" | string;
  city: string;
  student_id_number: string;
  follower_count: number;
  instagram_public: string;
  cv_file: string;
  content_frequency: string;
  willing_attend_event: boolean;
  status: "PENDING_REVIEW" | "ACCEPTED" | "REJECTED" | "INTERVIEW" | string;
  interview_schedule: string | null;
  interview_method: string | null;
  interview_link: string | null;
  interview_notes: string | null;
  is_selected: boolean;
  referral_code: string | null;
  student_id_file: string;
  follow_sre_proof: string;
  twibbon_proof: string;
  portfolio_link: string;
  follow_futurest_proof: string;
}

function MemberSection({ member }: { member: MemberData; university: string }) {
  if (!member.name) return null;

  return (
    <div className="space-y-4">
      {/* <Typography
        variant="h6"
        weight="bold"
        className="text-[#3454D1] border-b pb-2"
      >
        <span className="text-black text-xl">{member.name}</span>
      </Typography> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Data Diri */}
        <div className="border rounded-xl p-0 overflow-hidden">
          <div className="bg-neutral-50 px-4 py-3 border-b font-semibold text-center">
            Data Diri
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Nama Lengkap
              </span>
              <span className="text-sm font-semibold text-right w-2/3">
                {member.name}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Email
              </span>
              <span className="text-sm font-semibold text-right w-2/3 truncate">
                {member.email || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Nomor Telepon
              </span>
              <span className="text-sm font-semibold text-right w-2/3">
                {member.phone || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Student ID
              </span>
              <span className="text-sm font-semibold text-right w-2/3 truncate">
                {member.student_id_number || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Student Type
              </span>
              <span className="text-sm font-semibold text-right w-2/3 truncate">
                {member.student_type || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                City
              </span>
              <span className="text-sm font-semibold text-right w-2/3 truncate">
                {member.city || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Instagram Account
              </span>
              {member.instagram_handle ? (
                <Link
                  href={`https://instagram.com/${member.instagram_handle.replace("@", "")}`}
                  target="_blank"
                  className="w-2/3 text-right"
                >
                  <span className="text-sm font-semibold truncate block hover:underline">
                    {member.instagram_handle}
                  </span>
                </Link>
              ) : (
                <span className="text-sm font-semibold text-right w-2/3">
                  -
                </span>
              )}
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Follower Count
              </span>
              <span className="text-sm font-semibold text-right w-2/3 truncate">
                {member.follower_count || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Content Frequency
              </span>
              <span className="text-sm font-semibold text-right w-2/3 truncate">
                {member.content_frequency || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Willing Attend Event
              </span>
              <span className="text-sm font-semibold text-right">
                {member.willing_attend_event ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Instagram Public
              </span>
              <span className="text-sm font-semibold text-right">
                {member.instagram_public ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Dokumen */}
        <div className="border rounded-xl p-0 overflow-hidden">
          <div className="bg-neutral-50 px-4 py-3 border-b font-semibold text-center">
            Dokumen
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {/* Custom mapping for documents available in API */}
            <DocumentPreview
              label="Portfolio Link"
              url={member.portfolio_link}
            />
            <DocumentPreview label="CV" url={member.cv_file} />
            <DocumentPreview label="Student ID" url={member.student_id_file} />
            <DocumentPreview
              label="Futurest Follow Proof"
              url={member.follow_futurest_proof}
            />
            <DocumentPreview
              label="SRE Follow Proof"
              url={member.follow_sre_proof}
            />
            <DocumentPreview label="Twibbon" url={member.twibbon_proof} />
            <DocumentPreview label="Twibbon" url={member.twibbon_proof} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Preview({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-neutral-600">{label}</span>
      <div className="border rounded-lg aspect-video flex items-center justify-center bg-neutral-50 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function DocumentPreview({
  label,
  url,
}: {
  label: string;
  url?: string | null;
}) {
  // 1. No URL
  if (!url) {
    return (
      <Preview label={label}>
        <ImageIcon className="h-6 w-6 mb-1" />
        <span className="text-[10px]">No File</span>
      </Preview>
    );
  }

  // 2. Image preview (only if looks like image)
  if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url)) {
    return (
      <Preview label={label}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={label}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ExternalLink className="h-5 w-5 text-neutral-400" />
        </div>
      </Preview>
    );
  }

  // 3. ALL other cases → link icon
  return (
    <Preview label={label}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center gap-2"
      >
        <LinkIcon className="h-6 w-6 text-neutral-500" />
        <span className="text-[10px] text-neutral-500">Open Link</span>
      </a>
    </Preview>
  );
}

export default function ParticipantDetailPage() {
  const params = useParams();
  // const router = useRouter();
  const participantId = params?.id as string;

  const { data: participant, isLoading } =
    useGetBrandAmbassadorParticipant(participantId);
  const approve = useApproveBrandAmbassador();

  const BREADCRUMBS = [
    { name: "Dashboard Admin", href: "/admin" },
    { name: "Brand Ambassador", href: "/admin/events/ba" },
    {
      name: "Detail Participant",
      href: `/admin/events/ba/${participantId}`,
    },
  ];

  const reject = useRejectBrandAmbassador();
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setReasonError("Alasan penolakan wajib diisi");
      return;
    }

    reject.mutate(
      {
        participantId: participantId,
        reason: rejectReason,
        email: participant?.email ?? "",
        name: participant?.name ?? "",
      },
      {
        onSuccess: () => {
          setOpenRejectModal(false);
          setRejectReason("");
          setReasonError("");
          // toast.success sudah ada di hook
        },
        onError: () => {
          // error sudah ditangani di hook
        },
      },
    );
  };

  const updateStatus = useUpdateParticipantStatus(participantId);

  // Hitung waktu interview +5 jam (timezone WIB)
  const interviewTimeWIB = participant?.interview_schedule
    ? toZonedTime(new Date(participant.interview_schedule), "Asia/Jakarta")
    : null;

  const interviewEndTime = interviewTimeWIB
    ? addHours(interviewTimeWIB, 5)
    : null;

  // Apakah waktu sekarang sudah lewat 5 jam dari jadwal interview?
  const isInterviewOverdue = interviewEndTime
    ? isAfter(new Date(), interviewEndTime)
    : false;

  // Tombol "Complete Interview" hanya muncul jika:
  // - Status masih INTERVIEW_SCHEDULED
  // - Dan sudah lewat 5 jam dari jadwal
  const showCompleteButton =
    participant?.status === "INTERVIEW_SCHEDULED" && isInterviewOverdue;

  const handleCompleteInterview = () => {
    updateStatus.mutate("INTERVIEW_COMPLETED", {
      onSuccess: () => {
        toast.success("Interview berhasil diselesaikan!");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      },
      onError: () => {
        toast.error("Gagal menyelesaikan interview");
      },
    });
  };

  if (isLoading)
    return (
      <AdminLayouts withNavbar withSidebar>
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin" />
        </div>
      </AdminLayouts>
    );
  if (!participant)
    return (
      <AdminLayouts withNavbar withSidebar>
        <div className="p-10">Participant not found</div>
      </AdminLayouts>
    );

  return (
    <AdminLayouts withNavbar={true} withSidebar={true}>
      <div className="p-6 space-y-8 bg-white min-h-screen">
        {/* Header Section from Design 2 */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Typography
                font="FiraSans"
                variant="h4"
                className="text-neutral-600 uppercase tracking-wide"
              >
                Brand Ambassador
              </Typography>
              <div className="flex items-center gap-2">
                <Typography
                  font="FiraSans"
                  variant="h2"
                  weight="heavy-compressed"
                  className="text-[#3454D1] uppercase"
                >
                  {participant.name} - {participant.institution_name}
                </Typography>
              </div>
              <BreadcrumbGroup items={BREADCRUMBS} />
            </div>

            <div className="flex flex-col items-end gap-3">
              <StatusBadge status={participant.status} />

              {participant.status === "INTERVIEW_SCHEDULED" &&
                showCompleteButton && (
                  <Button
                    onClick={handleCompleteInterview}
                    disabled={updateStatus.isPending}
                    className="bg-white hover:bg-gray-50 shadow-sm h-8 px-3 border-none flex items-center gap-1 whitespace-nowrap text-[#059669] hover:text-[#047857]"
                  >
                    {updateStatus.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Menyelesaikan...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Complete Interview
                      </>
                    )}
                  </Button>
                )}

              {participant.status === "INTERVIEW_COMPLETED" && (
                <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
                  <Button
                    className="bg-white hover:bg-[#ECFDF5] shadow-sm h-8 px-3 border-none flex items-center gap-1 whitespace-nowrap text-[#059669] hover:text-[#047857]"
                    onClick={() => {
                      if (participant) {
                        approve.mutate({
                          participantId: participant.id,
                          email: participant.email, // Ambil dari data row
                          name: participant.name, // Ambil dari data row
                        });
                      }
                    }}
                    disabled={approve.isPending}
                  >
                    <CheckCircle2 size={14} /> Verify
                  </Button>
                  <Button
                    className="bg-white hover:bg-[#FFF7ED] shadow-sm h-8 px-3 border-none flex items-center gap-1 whitespace-nowrap text-[#F97316] hover:text-[#C2410C]"

                    // Add revision logic later if needed
                  >
                    <AlertCircle size={14} /> Revision
                  </Button>
                  <Dialog
                    open={openRejectModal}
                    onOpenChange={setOpenRejectModal}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="bg-white hover:bg-[#FEF2F2] shadow-sm h-8 px-3 border-none flex items-center gap-1 whitespace-nowrap text-[#EF4444] hover:text-[#B91C1C]"
                        disabled={reject.isPending}
                      >
                        <XCircle size={14} /> Reject
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Tolak Peserta</DialogTitle>
                        <DialogDescription>
                          Berikan alasan penolakan yang jelas untuk peserta ini.
                          Alasan ini akan tercatat dan bisa dikomunikasikan ke
                          peserta.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="reason">Alasan Penolakan</Label>
                          <Textarea
                            id="reason"
                            placeholder="Masukkan alasan penolakan di sini..."
                            value={rejectReason}
                            onChange={(e) => {
                              setRejectReason(e.target.value);
                              setReasonError(""); // hapus error saat user ketik
                            }}
                            className="resize-none min-h-[100px] dark:bg-white dark:text-black"
                            disabled={reject.isPending}
                          />
                          {reasonError && (
                            <p className="text-sm text-red-600">
                              {reasonError}
                            </p>
                          )}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          onClick={() => setOpenRejectModal(false)}
                          disabled={reject.isPending}
                          className="text-white bg-black w-full sm:w-auto min-w-[120px] border border-neutral-300 hover:bg-neutral-100"
                        >
                          Batal
                        </Button>
                        <Button
                          onClick={handleReject}
                          disabled={reject.isPending}
                          className="text-white bg-black w-full sm:w-auto min-w-[140px] flex items-center justify-center gap-2"
                        >
                          {reject.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Menolak...
                            </>
                          ) : (
                            "Tolak Peserta"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-200" />

        <InterviewSection
          participantId={participantId}
          interview_schedule={participant.interview_schedule}
          interview_method={participant.interview_method}
          interview_link={participant.interview_link}
          interview_notes={participant.interview_notes}
          email={participant.email}
          name={participant.name}
          phone={participant.phone}
          status={participant.status}
        />

        <Separator className="bg-neutral-200" />

        {/* Leader Section */}
        <MemberSection
          university={participant.institution_name}
          member={{
            name: participant.name,
            email: participant.email,
            phone: participant.phone,
            instagram_handle: participant.instagram_handle,
            student_type: participant.student_type,
            city: participant.city,
            student_id_number: participant.student_id_number,
            follower_count: participant.follower_count,
            instagram_public: participant.instagram_public,
            content_frequency: participant.content_frequency,
            status: participant.status,
            interview_schedule: participant.interview_schedule,
            interview_method: participant.interview_method,
            interview_link: participant.interview_link,
            interview_notes: participant.interview_notes,
            willing_attend_event: participant.willing_attend_event,
            is_selected: participant.is_selected,
            referral_code: participant.referral_code,
            student_id_file: participant.student_id_file,
            cv_file: participant.cv_file,
            follow_sre_proof: participant.follow_sre_proof,
            twibbon_proof: participant.twibbon_proof,
            portfolio_link: participant.portfolio_link,
            follow_futurest_proof: participant.follow_futurest_proof,
          }}
        />
      </div>
    </AdminLayouts>
  );
}
