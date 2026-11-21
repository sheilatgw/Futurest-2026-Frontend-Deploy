"use client";

import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import BreadcrumbGroup from "@/components/breadcrumb";
import Typography from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Loader2, XCircle, FileImage } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/buttons/button";
import MemberSection from "@/app/(dashboard)/admin/events/shared/MemberSection";
import StatusBadgeDetail from "@/app/(dashboard)/admin/events/shared/StatusBadge";
import RejectModal from "@/app/(dashboard)/admin/events/shared/RejectModal";
import {
  useGetCompetitionTeam,
  useUpdateCompetitionTeamStatus,
} from "@/hooks/use-compe";

// IMPORT MODAL PINTAR
import FileViewerModal from "../../shared/FileViewerModal";

export default function RepiTeamDetailPage() {
  const params = useParams();
  const teamId = params?.id as string;

  const { data: team, isLoading } = useGetCompetitionTeam(teamId);
  const updateStatus = useUpdateCompetitionTeamStatus();

  const [openRejectModal, setOpenRejectModal] = useState(false);

  // STATE UNTUK MODAL DOKUMEN
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    { name: "REPI", href: "/admin/events/repi" },
    {
      name: team?.team_name || "Detail Team",
      href: `/admin/events/repi/${teamId}`,
    },
  ];

  const isPaymentVerification = team?.status === "PAYMENT_VERIFICATION";
  const isAbstractVerification = team?.status === "ABSTRACT_VERIFICATION";
  const isPaymentRejected = team?.status === "PAYMENT_REJECTED";
  const isAbstractRejected = team?.status === "ABSTRACT_REJECTED";
  const isRegistrationApproved = team?.status === "REGISTRATION_APPROVED";

  // Check if mutation is pending
  const isPending = updateStatus.isPending;

  const handleApprove = () => {
    if (isPaymentVerification) {
      // Normal flow: approve payment -> abstract verification
      updateStatus.mutate({ teamId, status: "ABSTRACT_VERIFICATION" });
    } else if (isAbstractVerification) {
      // Normal flow: approve abstract -> registration approved
      updateStatus.mutate({ teamId, status: "REGISTRATION_APPROVED" });
    } else if (isPaymentRejected) {
      // Undo rejection: restore to payment verification
      updateStatus.mutate({ teamId, status: "PAYMENT_VERIFICATION" });
    } else if (isAbstractRejected) {
      // Undo rejection: restore to abstract verification
      updateStatus.mutate({ teamId, status: "ABSTRACT_VERIFICATION" });
    } else if (isRegistrationApproved) {
      // Undo approval: restore to abstract verification
      updateStatus.mutate({ teamId, status: "ABSTRACT_VERIFICATION" });
    }
  };

  const handleRejectConfirm = (reason: string) => {
    if (isPaymentVerification) {
      // Reject payment
      updateStatus.mutate(
        { teamId, status: "PAYMENT_REJECTED", reason },
        {
          onSuccess: () => {
            setOpenRejectModal(false);
          },
        },
      );
    } else if (isAbstractVerification) {
      // Reject abstract
      updateStatus.mutate(
        { teamId, status: "ABSTRACT_REJECTED", reason },
        {
          onSuccess: () => {
            setOpenRejectModal(false);
          },
        },
      );
    }
  };

  if (isLoading)
    return (
      <AdminLayouts withNavbar withSidebar>
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-[#0F936D]" size={40} />
        </div>
      </AdminLayouts>
    );

  if (!team)
    return (
      <AdminLayouts withNavbar withSidebar>
        <div className="p-10 text-center text-gray-500 font-semibold">
          Team not found or data is empty.
        </div>
      </AdminLayouts>
    );

  return (
    <AdminLayouts withNavbar={true} withSidebar={true}>
      {/* 🚀 RENDER FILE VIEWER MODAL 🚀 */}
      {selectedFileUrl && (
        <FileViewerModal
          fileUrl={selectedFileUrl}
          onClose={() => setSelectedFileUrl(null)}
        />
      )}

      <div className="p-6 space-y-8 bg-white min-h-screen">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-1">
              <Typography
                font="FiraSans"
                variant="h5"
                weight="extrabold"
                className="text-neutral-600 uppercase tracking-wide"
              >
                REPI
              </Typography>
              <BreadcrumbGroup items={BREADCRUMBS} />
              <div className="flex items-center gap-2">
                <Typography
                  font="Titillium"
                  variant="h1"
                  weight="extrabold"
                  className="text-[#FE5D26] uppercase"
                >
                  {team.team_name}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
              <StatusBadgeDetail status={team.status} />

              {(isPaymentVerification ||
                isAbstractVerification ||
                isPaymentRejected ||
                isAbstractRejected ||
                isRegistrationApproved) && (
                <div className="flex items-center gap-2 w-full md:w-[296px] lg:w-[496px]">
                  <Button
                    size="md"
                    variant="outline"
                    className={
                      isRegistrationApproved
                        ? "border-[#FE5D26] text-[#FE5D26] bg-[#FFEFEA] flex-1 gap-2"
                        : "border-[#0F936D] text-[#0F936D] flex-1 gap-2"
                    }
                    onClick={handleApprove}
                    disabled={isPending}
                    leftIcon={CheckCircle2}
                  >
                    {isRegistrationApproved
                      ? "Undo Approval"
                      : isPaymentRejected || isAbstractRejected
                        ? "Restore to Verification"
                        : "Verify"}
                  </Button>
                  {(isPaymentVerification || isAbstractVerification) && (
                    <Button
                      size="md"
                      variant="outline"
                      className="border-[#F25757] text-[#F25757] bg-[#FDEEEE] flex-1 gap-2"
                      disabled={isPending}
                      onClick={() => setOpenRejectModal(true)}
                      leftIcon={XCircle}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reject Modal */}
        <RejectModal
          isOpen={openRejectModal}
          onClose={() => setOpenRejectModal(false)}
          onConfirm={handleRejectConfirm}
          isLoading={isPending}
          type={isPaymentVerification ? "payment" : "abstract"}
        />

        {/* Team Details Section */}
        <div className="space-y-4">
          <div className="border-2 border-neutral-200 rounded-lg p-6 w-full mx-auto space-y-4">
            <Typography
              font="Sora"
              variant="h6"
              weight="extrabold"
              className="text-center"
            >
              Team Details
            </Typography>
            <div className="flex justify-between items-start">
              <Typography
                font="Sora"
                variant="t"
                weight="bold"
                className="text-neutral-900"
              >
                Institution:
              </Typography>
              <Typography
                font="Sora"
                variant="t"
                weight="regular"
                className="text-neutral-900"
              >
                {team.university}
              </Typography>
            </div>
            <Separator className="bg-neutral-900" />
            <div className="flex justify-between items-start">
              <Typography
                font="Sora"
                variant="t"
                weight="bold"
                className="text-neutral-900"
              >
                Academic Supervisor:
              </Typography>
            </div>
            <div className="flex justify-between items-start pl-4">
              <Typography
                font="Sora"
                variant="t"
                weight="regular"
                className="text-neutral-900"
              >
                Name:
              </Typography>
              <Typography
                font="Sora"
                variant="t"
                weight="regular"
                className="text-neutral-900"
              >
                {team.supervisor_name}
              </Typography>
            </div>
            <div className="flex justify-between items-start pl-4">
              <Typography
                font="Sora"
                variant="t"
                weight="regular"
                className="text-neutral-900"
              >
                Phone Number:
              </Typography>
              <Typography
                font="Sora"
                variant="t"
                weight="regular"
                className="text-neutral-900"
              >
                {team.supervisor_phone}
              </Typography>
            </div>

            <Separator className="bg-neutral-900" />

            {/* --- PAYMENT PROOF --- */}
            <div className="flex justify-between items-start">
              <Typography
                font="Sora"
                variant="t"
                weight="bold"
                className="text-neutral-900"
              >
                Payment Proof:
              </Typography>

              <div>
                {team.payment_proof ? (
                  <button
                    onClick={() => setSelectedFileUrl(team.payment_proof)} // Buka modal
                    className="flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] rounded-lg transition-colors border border-gray-300"
                  >
                    <FileImage className="w-5 h-5 text-[#3A6AB2]" />
                    <Typography
                      font="Sora"
                      weight="semibold"
                      className="text-sm"
                    >
                      See Attachment
                    </Typography>
                  </button>
                ) : (
                  <Typography
                    font="Sora"
                    variant="t"
                    className="text-neutral-400 italic"
                  >
                    Not uploaded
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Team Data Section */}
        <div className="space-y-4">
          <div className="border-2 border-2-neutral-200 rounded-lg p-6 w-full mx-auto space-y-4">
            <div className="border-b-2 border-neutral-200 pb-4">
              <Typography
                font="Sora"
                variant="h6"
                weight="extrabold"
                className="text-center"
              >
                Team Data
              </Typography>
            </div>

            {/* Members */}
            {team.members.map((member, index) => (
              <MemberSection
                key={member.id}
                member={member}
                role={index === 0 ? "Team Leader" : `Team Member ${index}`}
                showBorder={index !== team.members.length - 1}
                // 🚀 PASSING PROPS ON IMAGE CLICK DI SINI 🚀
                onImageClick={(url: string) => setSelectedFileUrl(url)}
                team={team}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayouts>
  );
}
