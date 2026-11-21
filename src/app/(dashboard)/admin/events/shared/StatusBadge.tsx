import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadgeDetail({ status }: StatusBadgeProps) {
  const statusConfig = {
    PENDING_PAYMENT: {
      bg: "bg-[#475569]",
      icon: <AlertCircle size={16} />,
      label: "Pending Payment",
    },
    PAYMENT_VERIFICATION: {
      bg: "bg-[#CA8A04]",
      icon: <AlertCircle size={16} />,
      label: "Payment Verification",
    },
    PAYMENT_REJECTED: {
      bg: "bg-[#EF4444]",
      icon: <XCircle size={16} />,
      label: "Payment Rejected",
    },
    ABSTRACT_VERIFICATION: {
      bg: "bg-[#3454D1]",
      icon: <AlertCircle size={16} />,
      label: "Abstract Verification",
    },
    ABSTRACT_REJECTED: {
      bg: "bg-[#F97316]",
      icon: <XCircle size={16} />,
      label: "Abstract Rejected",
    },
    REGISTRATION_APPROVED: {
      bg: "bg-[#0F936D]",
      icon: <CheckCircle2 size={16} />,
      label: "Approved",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    bg: "bg-neutral-500",
    icon: <AlertCircle size={16} />,
    label: status,
  };

  return (
    <div
      className={`${config.bg} px-4 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 w-full md:w-[296px] lg:w-[496px]`}
    >
      {config.icon}
      {config.label}
    </div>
  );
}
