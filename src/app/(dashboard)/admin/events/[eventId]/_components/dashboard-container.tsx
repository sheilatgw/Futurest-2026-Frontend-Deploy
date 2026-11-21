"use client";
import BreadcrumbGroup from "@/components/breadcrumb";
import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Clock, FilePen } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

// --- Import Hooks ---
// Swapped to Event Detail Hook
import useGetEventDetail from "@/hooks/use-get-event-detail";
import { EventDetailFieldResponse } from "@/types/page/event-detail-data";

type PageProps = {
  title: string;
  children?: React.ReactNode;
  id: string | undefined;
};

export default function DashboardContainerDetail({
  title,
  children,
  id,
}: PageProps) {
  const params = useParams();
  // const staffDetailId = params?.staffDetail as string
  // For events, we assume the ID is passed correctly or found in params
  const eventId = id || (params?.staffDetail as string);

  // === NEW DATA SOURCE ===
  const { eventData, isLoading: isEventLoading } = useGetEventDetail(eventId);

  // Safe cast (or use your wrapper type logic)
  const data = eventData?.data as EventDetailFieldResponse | undefined;

  // === COMMENTED OUT MUTATION HOOKS FOR NOW ===
  // You need to create separate hooks for "Accepting/Rejecting" a team later.
  /*
  const { uploadInterviewedData, isPending: isUpdatingInterview } = useUploadInterviewed()
  const { handleRejected, isPending: isUpdatingReject } = useRejectedInterview(staffDetailId)
  const { handleAccepted, isPending: isUpdatingAccept } = useAcceptedIterview(staffDetailId, accepted_division_id)
  */
  const isUpdatingStatus = false; // Placeholder

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    {
      name: "Events", // Generic Name
      href: `/admin/events`,
    },
    {
      name: data?.team_name || "Loading...",
      href: `#`,
    },
  ];

  // --- Handlers (Placeholder) ---
  const handleSetInterview = async () => {
    toast("Not implemented for Events yet");
  };
  const handleSetAccept = async () => {
    toast("Not implemented for Events yet");
  };
  const handleSetReject = () => {
    toast("Not implemented for Events yet");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-2 bg-slate-50 rounded-xl">
      <div className="flex flex-wrap gap-10 items-start justify-between">
        <div className="title-group flex flex-col gap-2">
          <Typography
            font="FiraSans"
            className="text-[#3454D1] font-semibold md:text-2xl leading-8 text-2xl"
          >
            {title}
          </Typography>

          {/* TEAM NAME HEADER */}
          {isEventLoading ? (
            <Skeleton className="h-10 w-64 rounded-lg" />
          ) : (
            <Typography
              font="FiraSans"
              className="text-black font-bold md:text-4xl leading-10 text-2xl"
            >
              {data?.team_name || "Unknown Team"}
            </Typography>
          )}

          <BreadcrumbGroup items={BREADCRUMBS} />
        </div>

        <div className="flex flex-col items-end gap-3 min-w-[250px]">
          {isEventLoading ? (
            <StaffStatusSkeleton />
          ) : (
            <StaffStatusControls
              // Mapping "registration_status" to the UI
              currentStatus={data?.registration_status ?? "PENDING"}
              onInterview={handleSetInterview}
              onAccept={handleSetAccept}
              onReject={handleSetReject}
              isUpdating={isUpdatingStatus}
            />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// === KOMPONEN UNTUK KONTROL STATUS ===

type StatusInfo = {
  text: string;
  icon: React.ReactNode;
  badgeClass: string;
};

function getStatusInfo(status: string): StatusInfo {
  // Normalize status (API might return "VERIFIED" or "APPROVED")
  switch (status?.toUpperCase()) {
    case "APPROVED":
    case "VERIFIED":
    case "ACCEPTED":
      return {
        text: "Verified",
        icon: <CircleCheck className="w-5 h-5" />,
        badgeClass: "bg-green-600 text-white",
      };
    case "REVISION":
    case "INTERVIEWED": // Mapping old status if needed
      return {
        text: "Revision",
        icon: <FilePen className="w-5 h-5" />,
        badgeClass: "bg-blue-600 text-white",
      };
    case "REJECTED":
    case "DECLINED":
      return {
        text: "Rejected",
        icon: <CircleX className="w-5 h-5" />,
        badgeClass: "bg-red-600 text-white",
      };
    case "PENDING":
    default:
      return {
        text: "Pending",
        icon: <Clock className="w-5 h-5" />,
        badgeClass: "bg-yellow-500 text-white",
      };
  }
}

type StaffStatusControlsProps = {
  currentStatus: string;
  onInterview: () => void;
  onAccept: () => void;
  onReject: () => void;
  isUpdating?: boolean;
};

function StaffStatusControls({
  currentStatus,
  onInterview,
  onAccept,
  onReject,
  isUpdating,
}: StaffStatusControlsProps) {
  const statusInfo = getStatusInfo(currentStatus);
  const upperCaseStatus = currentStatus?.toUpperCase();

  const isVerified =
    upperCaseStatus === "APPROVED" || upperCaseStatus === "VERIFIED";
  const isRejected = upperCaseStatus === "REJECTED";

  return (
    <>
      {/* Badge Status */}
      <div
        className={cn(
          "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-semibold",
          statusInfo.badgeClass,
        )}
      >
        {statusInfo.icon}
        <span className="text-lg">{statusInfo.text}</span>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Placeholder Buttons - You can re-enable these when you have the mutation hooks */}
        <Button
          variant="outline"
          className="border-[#FFEFEA] bg-[#FFEFEA] shadow-none text-[#FE5D26] hover:bg-blue-50 hover:text-blue-700 disabled:border-2 disabled:border-[#D4D4D8] disabled:bg-[#FFEFEA]"
          onClick={onInterview}
          disabled={isUpdating}
        >
          <FilePen className="w-4 h-4 mr-2" />
          Revisi
        </Button>
        <Button
          variant="outline"
          className="border-[#F4F4F5] shadow-none bg-[#F4F4F5] text-[#0F936D] hover:bg-green-50 hover:text-green-700 disabled:border-2 disabled:border-[#D4D4D8] disabled:bg-[#F4F4F5]"
          onClick={onAccept}
          disabled={isUpdating || isVerified}
        >
          <CircleCheck className="w-4 h-4 mr-2" />
          Approve
        </Button>
        <Button
          variant="outline"
          className="bg-[#FDEEEE] border-[#FDEEEE] shadow-none text-[#F25757] hover:bg-red-50 hover:text-red-700 disabled:border-2 disabled:border-[#D4D4D8] disabled:bg-[#FDEEEE]"
          onClick={onReject}
          disabled={isUpdating || isRejected}
        >
          <CircleX className="w-4 h-4 mr-2" />
          Reject
        </Button>
      </div>
    </>
  );
}

function StaffStatusSkeleton() {
  return (
    <>
      <Skeleton className="h-[46px] w-full rounded-lg" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </>
  );
}
