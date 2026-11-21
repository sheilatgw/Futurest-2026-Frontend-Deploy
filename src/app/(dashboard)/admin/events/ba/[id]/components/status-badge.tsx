// components/status-badge.tsx

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  PenLine,
  XCircle,
} from "lucide-react";
import React from "react";

// Type dan Config (sama seperti sebelumnya)
export type ParticipantStatus =
  | "PENDING_REVIEW"
  | "UNDER_REVIEW"
  | "INTERVIEW_SCHEDULED"
  | "INTERVIEW_COMPLETED"
  | "ACCEPTED"
  | "REJECTED";

export interface StatusDisplay {
  bg: string;
  icon: JSX.Element;
  text: string;
}

export const statusConfig: Record<ParticipantStatus, StatusDisplay> = {
  PENDING_REVIEW: {
    bg: "bg-[#9CA3AF]",
    icon: <AlertCircle size={16} />,
    text: "Pending Review",
  },
  UNDER_REVIEW: {
    bg: "bg-[#F59E0B]",
    icon: <PenLine size={16} />,
    text: "Under Review",
  },
  INTERVIEW_SCHEDULED: {
    bg: "bg-[#3B82F6]",
    icon: <Calendar size={16} />,
    text: "Interview Scheduled",
  },
  INTERVIEW_COMPLETED: {
    bg: "bg-[#8B5CF6]",
    icon: <CheckCircle2 size={16} />,
    text: "Interview Completed",
  },
  ACCEPTED: {
    bg: "bg-[#10B981]",
    icon: <CheckCircle2 size={16} />,
    text: "Accepted",
  },
  REJECTED: {
    bg: "bg-[#EF4444]",
    icon: <XCircle size={16} />,
    text: "Rejected",
  },
};

export const defaultStatusConfig: StatusDisplay = {
  bg: "bg-[#6B7280]",
  icon: <AlertCircle size={16} />,
  text: "Unknown Status",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "md" | "lg"; // tambahan prop untuk ukuran
}

export function StatusBadge({
  status,
  className,
  size = "md",
}: StatusBadgeProps) {
  const currentStatus = status as ParticipantStatus;
  const config = statusConfig[currentStatus] || defaultStatusConfig;

  // Ukuran responsif berdasarkan prop size
  const sizeClasses = {
    sm: "px-3 py-1 text-xs gap-1.5",
    md: "px-4 py-1.5 text-sm gap-2",
    lg: "px-5 py-2 text-base gap-2.5",
  };

  // Icon size juga ikut responsif
  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  return (
    <div
      className={cn(
        // Base classes
        "inline-flex items-center justify-center rounded-full text-white font-medium",
        // Ukuran responsif
        sizeClasses[size],
        // Warna background
        config.bg,
        // Tambahan class dari props
        className,
        // Pastikan tidak overflow di mobile
        "max-w-full truncate",
        "whitespace-nowrap",
      )}
    >
      {/* Icon */}
      {React.cloneElement(config.icon, { size: iconSize })}

      {/* Text */}
      <span className="font-medium truncate">{config.text}</span>
    </div>
  );
}
