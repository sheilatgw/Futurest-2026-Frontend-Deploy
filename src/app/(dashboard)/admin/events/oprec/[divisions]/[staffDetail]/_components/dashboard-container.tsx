"use client";
import BreadcrumbGroup from "@/components/breadcrumb";
import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDetailRegistrant from "@/hooks/use-get-detail-registrant";
import { useSubDivision } from "@/hooks/use-get-subdivision";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Clock, FilePen } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

import useAcceptedIterview from "@/hooks/use-accepted";
import useRejectedInterview from "@/hooks/use-rejected";
// --- Import Hooks ---
import { useUploadInterviewed } from "@/hooks/use-upload-results";

type PageProps = {
  title: string;
  children?: React.ReactNode;
  id: string | undefined;
};

export default function DashboardContainer({ title, children }: PageProps) {
  const params = useParams();

  const accepted_division_id = params?.divisions as string;
  const staffDetailId = params?.staffDetail as string;

  const { data: subDivision } = useSubDivision(accepted_division_id);

  const { detailData: registrant, isLoading: isRegistrantLoading } =
    useGetDetailRegistrant(staffDetailId);

  // --- Gunakan KETIGA hook mutasi ---
  const { uploadInterviewedData, isPending: isUpdatingInterview } =
    useUploadInterviewed();
  const { handleRejected, isPending: isUpdatingReject } =
    useRejectedInterview(staffDetailId);
  const { handleAccepted, isPending: isUpdatingAccept } = useAcceptedIterview(
    staffDetailId,
    accepted_division_id,
  );

  // --- Gabungkan status pending ---
  const isUpdatingStatus =
    isUpdatingInterview || isUpdatingReject || isUpdatingAccept;

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    {
      name: subDivision?.name || "Loading...",
      href: `/admin/${params.divisions}`,
    },
    {
      name: registrant?.data.name || "Loading...",
      href: `/admin/${params.divisions}/${subDivision?.id}`,
    },
  ];

  // --- Handler untuk INTERVIEW ---
  const handleSetInterview = async () => {
    if (!staffDetailId) {
      toast.error("ID pendaftar tidak ditemukan.");
      return;
    }

    toast.loading(`Mengubah status menjadi interview...`);

    try {
      await uploadInterviewedData({
        id: staffDetailId,
        accepted_division_id: accepted_division_id,
        data: {
          status: "interview",
        },
      });

      toast.dismiss();
      toast.success(`Status berhasil diubah menjadi interview!`);
    } catch (err: any) {
      toast.dismiss();
      toast.error(
        `Gagal mengubah status: ${err.message || "Error tidak diketahui"}`,
      );
    }
  };

  // --- Handler untuk ACCEPT ---
  const handleSetAccept = async () => {
    if (!staffDetailId) {
      toast.error("ID pendaftar tidak ditemukan.");
      return;
    }

    toast.loading(`Mengubah status menjadi accepted...`);

    try {
      await handleAccepted();
    } catch (err: any) {
      toast.dismiss();
      toast.error(
        `Gagal mengubah status: ${err.message || "Error tidak diketahui"}`,
      );
    }
  };

  // --- Handler untuk REJECT ---
  const handleSetReject = () => {
    if (!staffDetailId) {
      toast.error("ID pendaftar tidak ditemukan.");
      return;
    }
    handleRejected();
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap gap-10 items-start justify-between">
        <div className="title-group flex flex-col gap-5">
          <Typography
            variant="h1"
            weight="bold"
            font="FiraSans"
            className="text-blue-800"
          >
            {title}
          </Typography>
          <BreadcrumbGroup items={BREADCRUMBS} />
        </div>

        <div className="flex flex-col items-end gap-3 min-w-[250px]">
          {isRegistrantLoading ? (
            <StaffStatusSkeleton />
          ) : (
            <StaffStatusControls
              currentStatus={registrant?.data?.status ?? "pending"}
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
  switch (status?.toLowerCase()) {
    case "accepted":
      return {
        text: "Accepted",
        icon: <CircleCheck className="w-5 h-5" />,
        badgeClass: "bg-green-600 text-white",
      };
    case "interviewed":
      return {
        text: "Revisi",
        icon: <FilePen className="w-5 h-5" />,
        badgeClass: "bg-blue-600 text-white",
      };
    case "rejected":
      return {
        text: "Rejected",
        icon: <CircleX className="w-5 h-5" />,
        badgeClass: "bg-red-600 text-white",
      };
    case "pending":
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
  const lowerCaseStatus = currentStatus.toLowerCase();

  // Status logic untuk button disable
  const isInterview = lowerCaseStatus === "interviewed";

  const isRejected = lowerCaseStatus === "rejected";

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
        <Button
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          onClick={onInterview}
          // Interview: disable jika sudah interviewed
          disabled={isUpdating || isInterview}
        >
          <FilePen className="w-4 h-4 mr-2" />
          Revisi
        </Button>
        <Button
          variant="outline"
          className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
          onClick={onAccept}
          // Accept: hanya enable saat status interviewed
          disabled={isUpdating || lowerCaseStatus !== "interviewed"}
        >
          <CircleCheck className="w-4 h-4 mr-2" />
          Accept
        </Button>
        <Button
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onReject}
          // Reject: disable jika sudah rejected
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
