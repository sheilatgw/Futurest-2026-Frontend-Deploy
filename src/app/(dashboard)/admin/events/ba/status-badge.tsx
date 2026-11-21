import Typography from "@/components/typography";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "ACCEPTED":
      return {
        label: "Accepted",
        className: "!bg-emerald-100 !text-[#059669] !border-0",
      };
    case "UNDER_REVIEW":
      return {
        label: "Under Review",
        className: "!bg-slate-100 !text-[#475569] !border-0",
      };
    case "REJECTED":
      return {
        label: "Rejected",
        className: "!bg-red-100 !text-[#DC2626] !border-0",
      };
    case "INTERVIEW_SCHEDULED":
      return {
        label: "Interview Scheduled",
        className: "!bg-orange-100 !text-[#EA580C] !border-0",
      };
    case "INTERVIEW_COMPLETED":
      return {
        label: "Interview Completed",
        className: "!bg-orange-100 !text-[#EA580C] !border-0",
      };
    case "PENDING_REVIEW":
      return {
        label: "Pending Review",
        className: "!bg-yellow-100 !text-[#CA8A04] !border-0",
      };
    default:
      return {
        label: status.replace("_", " "),
        className: "!bg-gray-100 !text-gray-600 !border-0",
      };
  }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = getStatusConfig(status);

  return (
    <div
      className={cn(
        "flex items-center justify-center px-3 py-1 rounded-md min-w-[100px]",
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
