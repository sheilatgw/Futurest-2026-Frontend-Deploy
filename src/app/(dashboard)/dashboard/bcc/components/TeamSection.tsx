import Typography from "@/components/typography";
import { ChevronDown, ChevronUp, FileImage } from "lucide-react";

interface TeamSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onImageClick?: (url: string) => void; // Props buat manggil modal
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
  onImageClick,
  data,
}: TeamSectionProps) {
  return (
    <div className="mb-4">
      {/* === HEADER === */}
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center px-6 py-4 bg-[#3454D1] transition-all duration-300 ${
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

          {/* UBAH STUDENT ID JADI FILE */}
          <InfoRow
            label="Student ID"
            value={data.studentId}
            isFile
            onClickFile={() => onImageClick && onImageClick(data.studentId)}
          />

          {/* Tipe File Lainnya */}
          {data.documentLink && (
            <InfoRow
              label="Document Link"
              value={data.documentLink}
              isFile
              onClickFile={() =>
                onImageClick && onImageClick(data.documentLink!)
              }
            />
          )}
          {data.paymentLink && (
            <InfoRow
              label="Payment Link"
              value={data.paymentLink}
              isFile
              onClickFile={() =>
                onImageClick && onImageClick(data.paymentLink!)
              }
            />
          )}
          {data.submissionLink && (
            <InfoRow
              label="Submission Link"
              value={data.submissionLink}
              isFile
              onClickFile={() =>
                onImageClick && onImageClick(data.submissionLink!)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

// === KOMPONEN INFOROW DIUPDATE ===
function InfoRow({
  label,
  value,
  isFile, // Penanda apakah baris ini berisi file link
  onClickFile, // Fungsi yang dijalankan saat tombol diklik
}: {
  label: string;
  value: string;
  isFile?: boolean;
  onClickFile?: () => void;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[110px_12px_1fr]
        md:grid-cols-[160px_12px_1fr]
        gap-x-3
        items-center
        px-2
        py-2.5
        border-b border-gray-100 last:border-0
      "
    >
      <Typography className="font-semibold text-gray-800">{label}</Typography>

      <Typography className="text-gray-800">:</Typography>

      <div className="flex items-center">
        {/* LOGIC RENDERING: Pastikan value BUKAN "-" sebelum merender tombol */}
        {isFile && value && value !== "-" ? (
          <button
            onClick={onClickFile}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] rounded-lg transition-colors border border-gray-300 w-fit"
          >
            <FileImage className="w-4 h-4 text-[#3454D1]" />
            <Typography font="Sora" weight="semibold" className="text-sm">
              See Attachment
            </Typography>
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
