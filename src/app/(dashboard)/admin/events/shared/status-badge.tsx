import Typography from "@/components/typography";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PAYMENT_APPROVED":
      case "SUBMISSION_APPROVED":
        return {
          label: "Accepted",
          className: "bg-[#D1FAE5] text-[#059669] border-[#6EE7B7]", // Emerald
        };
      case "PENDING_PAYMENT":
        return {
          label: "Waiting for Payment",
          className: "bg-[#FFEDD5] text-[#EA580C] border-[#FDBA74]", // Orange
        };
      case "PAYMENT_VERIFICATION":
        return {
          label: "Payment Verification",
          className: "bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]", // Slate
        };
      case "PAYMENT_REJECTED":
      case "SUBMISSION_REJECTED":
        return {
          label: "Rejected",
          className: "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]", // Red
        };
      case "SUBMISSION_VERIFICATION":
        return {
          label: "Submission Verification",
          className: "bg-[#DBEAFE] text-[#2563EB] border-[#93C5FD]", // Blue
        };
      default:
        return {
          label: status.replace(/_/g, " "),
          className: "bg-gray-100 text-gray-600 border-gray-200",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={cn(
        "flex items-center justify-center px-3 py-1 rounded-md border min-w-[100px]",
        config.className,
      )}
    >
      <Typography
        font="Sora"
        className="text-xs font-bold uppercase tracking-wide"
      >
        {config.label}
      </Typography>
    </div>
  );
};
