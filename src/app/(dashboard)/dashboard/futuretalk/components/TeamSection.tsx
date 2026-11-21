import Typography from "@/components/typography";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TeamSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  data: {
    fullName: string;
    email: string;
    whatsapp?: string;
    university: string;
    studentId: string;
    documentLink?: string;
    paymentLink?: string;
    submissionLink?: string;
  };
}

export default function TeamSection({
  title,
  isOpen,
  onToggle,
  data,
}: TeamSectionProps) {
  return (
    <div className="mb-4">
      {/* === HEADER === */}
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center px-6 py-4 bg-[#0B8457] transition-all duration-300 ${
          isOpen ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <Typography className="text-white font-bold text-lg md:text-2xl">
          {title}
        </Typography>
        {isOpen ? (
          <ChevronUp className="text-white" />
        ) : (
          <ChevronDown className="text-white" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#f8f9fa] p-6 rounded-b-2xl border border-t-0 border-gray-200">
          <InfoRow label="Full Name" value={data.fullName} />
          <InfoRow label="Email" value={data.email} />
          {data.whatsapp && (
            <InfoRow label="Whatsapp Number" value={data.whatsapp} />
          )}
          <InfoRow label="University" value={data.university} />
          <InfoRow label="Student ID" value={data.studentId} />
          {data.documentLink && (
            <InfoRow label="Document Link" value={data.documentLink} />
          )}
          {data.paymentLink && (
            <InfoRow label="Payment Link" value={data.paymentLink} />
          )}
          {data.submissionLink && (
            <InfoRow label="Submission Link" value={data.submissionLink} />
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[110px_12px_1fr]
        md:grid-cols-[160px_12px_1fr]
        gap-x-3
        items-start
        px-2
        py-2
      "
    >
      <Typography className="font-semibold text-gray-800">{label}</Typography>

      <Typography className="text-gray-800">:</Typography>

      <Typography
        className="
          text-gray-800
          leading-relaxed
          break-all
          [overflow-wrap:anywhere]
        "
      >
        {value || "-"}
      </Typography>
    </div>
  );
}
