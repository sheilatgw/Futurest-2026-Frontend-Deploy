import Typography from "@/components/typography";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PAID":
        return {
          label: "Accepted",
          className: "bg-[#D1FAE5] text-[#059669] border-[#6EE7B7]", // Emerald 100 bg, 600 text, 300 border
        };
      case "PAYMENT_VERIFICATION":
        return {
          label: "Waiting For Payment Verification",
          className: "bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]", // Slate 100 bg, 600 text, 300 border
        };
      case "REJECTED":
        return {
          label: "Rejected",
          className: "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]", // Red 100 bg, 600 text, 300 border
        };
      case "REVISI":
        return {
          label: "Interview",
          className: "bg-[#FFEDD5] text-[#EA580C] border-[#FDBA74]", // Orange 100 bg, 600 text, 300 border
        };
      case "PENDING_PAYMENT":
        return {
          label: "Waiting for Payment",
          className: "bg-[#FFEDD5] text-[#EA580C] border-[#FDBA74]", // Orange 100 bg, 600 text, 300 border
        };
      default:
        return {
          label: status.replace("_", " "),
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
