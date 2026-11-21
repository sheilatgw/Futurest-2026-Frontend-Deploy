"use client";

import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import BreadcrumbGroup from "@/components/breadcrumb";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUpdateAbstractStatus } from "@/hooks/use-abstract-action";
import { useUpdateProposalStatus } from "@/hooks/use-propossal-action";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  useApproveFutureTalkPayment,
  useGetFutureTalkParticipant,
  useRejectFutureTalkPayment,
} from "../hooks";
import RejectModal from "./components/RejectModal";

// --- INTERFACES ---

interface MemberData {
  role: string;
  name: string;
  email: string | null;
  phone?: string | null;
  instagram_follow?: string | null;
  instagram_repost?: string | null;
  instagram_story?: string | null;
  ktm?: string | null;
  id_line?: string | null;
}

// --- SUB COMPONENTS ---

function MemberSection({
  member,
  university,
}: {
  member: MemberData;
  university: string;
}) {
  if (!member.name) return null;

  return (
    <div className="space-y-4">
      <Typography
        variant="h6"
        weight="bold"
        className="text-[#3454D1] border-b pb-2"
      >
        {member.role} <br />
        <span className="text-black text-xl">{member.name}</span>
      </Typography>

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
                Asal Kampus
              </span>
              <span className="text-sm font-semibold text-right w-2/3">
                {university}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                Nomor WhatsApp
              </span>
              <span className="text-sm font-semibold text-right w-2/3">
                {member.phone || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground w-1/3">
                ID LINE
              </span>
              <span className="text-sm font-semibold text-right w-2/3">
                {member.id_line || "-"}
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
            <DocumentPreview
              label="Bukti Follow IG"
              url={member.instagram_follow}
            />
            <DocumentPreview
              label="Bukti Repost IG"
              url={member.instagram_repost}
            />
            <DocumentPreview
              label="Bukti Story IG"
              url={member.instagram_story}
            />
            <DocumentPreview label="Bukti KTM" url={member.ktm} />
          </div>
        </div>
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
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-neutral-600">{label}</span>
      {url ? (
        <div className="border rounded-lg overflow-hidden aspect-video relative group bg-neutral-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={label} className="object-cover w-full h-full" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="text-white h-5 w-5" />
          </a>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center aspect-video bg-neutral-50 text-neutral-400">
          <ImageIcon className="h-6 w-6 mb-1" />
          <span className="text-[10px]">No Image</span>
        </div>
      )}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function ParticipantDetailPage() {
  const params = useParams();
  const _router = useRouter();
  const participantId = params?.participantId as string;

  // Hooks Data & Payment Action
  const { data: participant, isLoading } =
    useGetFutureTalkParticipant(participantId);
  const approvePayment = useApproveFutureTalkPayment();
  const rejectPayment = useRejectFutureTalkPayment();

  // Hooks Abstract Action
  const updateAbstract = useUpdateAbstractStatus();
  const updateProposal = useUpdateProposalStatus();

  // Local State
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRejectPropoOpen, setIsRejectPropoOpen] = useState(false);

  const BREADCRUMBS = [
    { name: "Dashboard Admin", href: "/admin" },
    { name: "Future Talk", href: "/admin/events/futuretalk" },
    {
      name: "Detail Participant",
      href: `/admin/events/futuretalk/${participantId}`,
    },
  ];

  // Handler confirm reject abstract
  const handleConfirmRejectAbstract = (reason: string) => {
    updateAbstract.mutate(
      { participantId, status: "ABSTRACT_REJECTED", reason },
      {
        onSuccess: () => setIsRejectModalOpen(false),
      },
    );
  };

  const handleConfirmRejectProposal = (reason: string) => {
    updateProposal.mutate(
      { participantId, status: "PROPOSAL_REJECTED", reason },
      {
        onSuccess: () => setIsRejectPropoOpen(false),
      },
    );
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
        {/* --- HEADER SECTION --- */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Typography
                font="FiraSans"
                variant="h4"
                className="text-neutral-600 uppercase tracking-wide"
              >
                Future Talk (Mini Case)
              </Typography>
              <div className="flex items-center gap-2">
                <Typography
                  font="FiraSans"
                  variant="h2"
                  weight="heavy-compressed"
                  className="text-[#3454D1] uppercase"
                >
                  {participant.team_name} - {participant.university}
                </Typography>
              </div>
              <BreadcrumbGroup items={BREADCRUMBS} />
            </div>

            <div className="flex flex-col items-end gap-3">
              {/* GLOBAL STATUS BADGE */}
              <div
                className={cn(
                  "px-4 py-1.5 rounded-full text-white font-medium flex items-center gap-2",
                  participant.status === "PAID" ||
                    participant.status === "ABSTRACT_APPROVED" ||
                    participant.status === "PROPOSAL_APPROVED"
                    ? "bg-[#10B981]"
                    : participant.status.includes("REJECTED")
                      ? "bg-[#EF4444]"
                      : "bg-[#9CA3AF]",
                )}
              >
                {participant.status.includes("APPROVED") ||
                participant.status === "PAID" ? (
                  <CheckCircle2 size={16} />
                ) : participant.status.includes("REJECTED") ? (
                  <XCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}

                {participant.status === "PAID"
                  ? "Team Verified"
                  : participant.status === "PAYMENT_VERIFICATION"
                    ? "Unverified"
                    : participant.status.replace(/_/g, " ")}
              </div>

              {/* ACTION BUTTONS: PAYMENT */}
              {participant.status === "PAYMENT_VERIFICATION" && (
                <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
                  <Button
                    className="bg-white hover:bg-[#ECFDF5] shadow-sm h-8 px-3 border-none flex items-center gap-1 whitespace-nowrap text-[#059669] hover:text-[#047857]"
                    onClick={() => approvePayment.mutate(participant.id)}
                    disabled={approvePayment.isPending}
                  >
                    <CheckCircle2 size={14} /> Verify Payment
                  </Button>
                  <Button
                    className="bg-white hover:bg-[#FEF2F2] shadow-sm h-8 px-3 border-none flex items-center gap-1 whitespace-nowrap text-[#EF4444] hover:text-[#B91C1C]"
                    onClick={() => rejectPayment.mutate(participant.id)}
                    disabled={rejectPayment.isPending}
                  >
                    <XCircle size={14} /> Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-200" />

        <div className="flex flex-col lg:flex-row w-full gap-6">
          {/* --- PAYMENT PROOF SECTION --- */}
          <div className="space-y-4 w-full">
            <Typography variant="h6" weight="bold" className="text-[#3454D1]">
              Payment Proof
            </Typography>
            <div className="border rounded-xl p-4 bg-neutral-50 max-w-md">
              <DocumentPreview
                label={`Payment Proof (Total: Rp ${
                  participant.total_price?.toLocaleString("id-ID") ?? 0
                })`}
                url={participant.payment_proof}
              />
            </div>
          </div>

          {/* --- ABSTRACT FILE SECTION --- */}
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-end max-w-md">
              <Typography variant="h6" weight="bold" className="text-[#3454D1]">
                Abstract File
              </Typography>

              {/* Status Indicators */}
              {participant.status === "ABSTRACT_APPROVED" && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200 flex gap-1 items-center">
                  <CheckCircle2 size={12} /> Approved
                </span>
              )}
              {participant.status === "ABSTRACT_REJECTED" && (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-200 flex gap-1 items-center">
                  <XCircle size={12} /> Rejected
                </span>
              )}
            </div>

            <div className="border rounded-xl p-4 bg-neutral-50 max-w-md space-y-4">
              <DocumentPreview
                label={`Abstract File`}
                url={participant.study_case_abstract_file}
              />

              {/* ACTION BUTTONS: ABSTRACT */}
              {/* Hanya muncul jika statusnya ABSTRACT_VERIFICATION */}
              {participant.status === "ABSTRACT_VERIFICATION" && (
                <div className="pt-2 border-t border-neutral-200 flex gap-2">
                  <Button
                    className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white shadow-md"
                    onClick={() =>
                      updateAbstract.mutate({
                        participantId,
                        status: "ABSTRACT_APPROVED",
                      })
                    }
                    disabled={updateAbstract.isPending}
                  >
                    {updateAbstract.isPending && !isRejectModalOpen ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <div className="flex flex-row font-sora py-3">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve Abstract
                      </div>
                    )}
                  </Button>

                  <Button
                    className="flex-1 bg-white border border-red-200 hover:bg-red-50 text-red-600"
                    onClick={() => setIsRejectModalOpen(true)}
                    disabled={updateAbstract.isPending}
                  >
                    <div className="flex flex-row font-sora py-3 text-red-800">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </div>
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {!participant.study_case_abstract_file &&
                participant.status === "PAID" && (
                  <div className="text-xs text-neutral-400 italic text-center py-2">
                    Waiting for user to upload abstract...
                  </div>
                )}
            </div>
          </div>
          {/* --- PROPOSAL FILE SECTION --- */}
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-end max-w-md">
              <Typography variant="h6" weight="bold" className="text-[#3454D1]">
                Proposal File
              </Typography>

              {/* Status Indicators */}
              {participant.status === "PROPOSAL_APPROVED" && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200 flex gap-1 items-center">
                  <CheckCircle2 size={12} /> Approved
                </span>
              )}
              {participant.status === "PROPOSAL_REJECTED" && (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-200 flex gap-1 items-center">
                  <XCircle size={12} /> Rejected
                </span>
              )}
            </div>

            <div className="border rounded-xl p-4 bg-neutral-50 max-w-md space-y-4">
              <DocumentPreview
                label={`Proposal File`}
                url={participant.minicase_proposal_file}
              />

              {/* ACTION BUTTONS: PROPOSAL */}
              {/* Hanya muncul jika statusnya PROPOSAL_VERIFICATION */}
              {participant.status === "PROPOSAL_VERIFICATION" && (
                <div className="pt-2 border-t border-neutral-200 flex gap-2">
                  <Button
                    className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white shadow-md"
                    onClick={() =>
                      updateProposal.mutate({
                        participantId,
                        status: "PROPOSAL_APPROVED",
                      })
                    }
                    disabled={updateProposal.isPending}
                  >
                    {updateProposal.isPending && !isRejectPropoOpen ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <div className="flex flex-row font-sora py-3">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve Proposal
                      </div>
                    )}
                  </Button>

                  <Button
                    className="flex-1 bg-white border border-red-200 hover:bg-red-50 text-red-600"
                    onClick={() => setIsRejectPropoOpen(true)}
                    disabled={updateProposal.isPending}
                  >
                    <div className="flex flex-row font-sora py-3 text-red-800">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </div>
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {!participant.minicase_proposal_file &&
                participant.status === "PROPOSAL_APPROVED" && (
                  <div className="text-xs text-neutral-400 italic text-center py-2">
                    Waiting for user to upload proposal...
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Modal untuk Reject dengan Reason */}
        <RejectModal
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          onConfirm={handleConfirmRejectAbstract}
          isLoading={updateAbstract.isPending}
        />

        <RejectModal
          isOpen={isRejectPropoOpen}
          onClose={() => setIsRejectPropoOpen(false)}
          onConfirm={handleConfirmRejectProposal}
          isLoading={updateProposal.isPending}
        />

        <Separator className="bg-neutral-200" />

        {/* --- MEMBER SECTIONS --- */}
        {/* Leader */}
        <MemberSection
          university={participant.university}
          member={{
            role: "Leader",
            name: participant.team_leader_name,
            email: participant.team_leader_email,
            phone: participant.team_leader_phone,
            instagram_follow: participant.team_leader_instagram_follow,
            instagram_repost: participant.team_leader_instagram_repost,
            instagram_story: participant.team_leader_instagram_story,
            ktm: participant.team_leader_ktm,
          }}
        />

        {/* Member 1 */}
        {participant.team_member_2_name && (
          <MemberSection
            university={participant.university}
            member={{
              role: "Team Member 1",
              name: participant.team_member_2_name,
              email: participant.team_member_2_email,
              instagram_follow: participant.team_member_2_instagram_follow,
              instagram_repost: participant.team_member_2_instagram_repost,
              instagram_story: participant.team_member_2_instagram_story,
              ktm: participant.team_member_2_ktm,
            }}
          />
        )}

        {/* Member 2 */}
        {participant.team_member_3_name && (
          <MemberSection
            university={participant.university}
            member={{
              role: "Team Member 2",
              name: participant.team_member_3_name,
              email: participant.team_member_3_email,
              instagram_follow: participant.team_member_3_instagram_follow,
              instagram_repost: participant.team_member_3_instagram_repost,
              instagram_story: participant.team_member_3_instagram_story,
              ktm: participant.team_member_3_ktm,
            }}
          />
        )}
      </div>
    </AdminLayouts>
  );
}
