"use client";
import BreadcrumbGroup from "@/components/breadcrumb";
import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { useSubDivision } from "@/hooks/use-get-subdivision";
import { useBulkUploadAccepted } from "@/hooks/use-upload-results";
import { useExportExcel } from "@/hooks/useExportToExcel";
import { File } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { UploadExcelButton } from "./upload-excel";
type PageProps = {
  title: string;
  children?: React.ReactNode;
  id: string | undefined;
  allowDownload?: boolean;
};
export default function DashboardContainer({
  title,
  children,
  id,
  allowDownload,
}: PageProps) {
  const params = useParams();
  const accepted_division_id = params?.divisions as string;
  const { data: subDivision } = useSubDivision(accepted_division_id);
  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    { name: subDivision?.name as string, href: "/admin/division" },
  ];
  const { downloadExcel } = useExportExcel();
  const { uploadInterviewedData } = useBulkUploadAccepted();
  const handleUpload = async (data: any[]) => {
    // 1. Simpan ID toast loading
    const toastId = toast.loading("⏳ Memproses data...");

    try {
      const _updatedData = data.map((row) => {
        const status =
          row.Status?.toLowerCase?.() === "accepted"
            ? "interviewed"
            : row.Status;
        return { ...row, Status: status };
      });

      // 1️⃣ Filter data yang status-nya accepted
      const filtered = data
        .filter((row) => row.Status?.toLowerCase() === "accepted")
        .map((row) => ({
          NRP: row.nrp || row.NRP || "",
          Nama: row.name || row.Name || "",
          Id: row.id || row.ID || "",
        }));

      if (filtered.length === 0) {
        // 2. Jika gagal validasi, update toast loading tadi menjadi error/warning
        toast.error("⚠️ Tidak ada data dengan status 'accepted'.", {
          id: toastId, // Penting: gunakan ID yang sama
        });
        return;
      }

      for (const user of filtered) {
        await uploadInterviewedData({
          id: user.Id,
          data: {
            name: user.Nama,
            status: "interviewed",
          },
          accepted_division_id, // pastikan variabel ini ada di scope
        });
      }

      // 3. Jika sukses, update toast loading tadi menjadi success
      toast.success(
        `✅ Berhasil update ${filtered.length} peserta menjadi diterima`,
        { id: toastId }, // Penting: gunakan ID yang sama
      );
    } catch (err) {
      console.error(err);
      // 4. Jika error catch, update toast loading tadi menjadi error
      toast.error("❌ Gagal mengolah file", {
        id: toastId, // Penting: gunakan ID yang sama
      });
    }
  };
  const handleClick = () => {
    downloadExcel({
      url: "api/v1/oprec-staff/export/excel?division_id=" + id,
      options: { fileName: "Oprec Staff Division.xlsx" },
    });
  };
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
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
        {allowDownload && (
          <div className="flex justify-end gap-4">
            <div className="download-section">
              <Button
                onClick={handleClick}
                type="button"
                variant="danger"
                className="flex gap-x-4"
              >
                <File />
                <Typography variant="p" className="text-white">
                  Export .XLSX
                </Typography>
              </Button>
            </div>
            <div className="import-data">
              <div className="flex gap-x-4">
                <UploadExcelButton onUpload={handleUpload} />
              </div>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
