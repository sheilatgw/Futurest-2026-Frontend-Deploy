"use client";

import { FileBadge2, Loader2 } from "lucide-react"; // Pake icon sertifikat biar beda
import { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";
import Button from "@/components/buttons/button";

interface Participant {
  id: string;
  team_name: string;
  university: string;
  // Sesuaikan field ini dengan data API lu
  team_leader_name: string;
  team_member_2_name?: string | null;
  team_member_3_name?: string | null;
}

interface ExportCertificateButtonProps {
  participants: Participant[] | undefined;
  isLoading: boolean;
}

export default function ExportCertificateButton({
  participants,
  isLoading,
}: ExportCertificateButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    if (!participants || participants.length === 0) {
      toast.error("No data to export");
      return;
    }

    setIsExporting(true);

    try {
      // 1. Siapin Header
      // Struktur: [Team Name, Member Name, University]
      const dataRows: (string | null)[][] = [
        ["Team Name", "Member Name", "University"],
      ];

      // Array buat nyimpen konfigurasi MERGE
      // Format: { s: {r: startRow, c: colIndex}, e: {r: endRow, c: colIndex} }
      const merges: XLSX.Range[] = [];

      let currentRow = 1; // Mulai dari baris 1 (karena baris 0 itu Header)

      participants.forEach((p) => {
        // Kumpulin semua member yang valid (gak null/undefined/string kosong)
        const members = [
          p.team_leader_name,
          p.team_member_2_name,
          p.team_member_3_name,
        ].filter((m): m is string => !!m && m.trim() !== "");

        if (members.length > 0) {
          // Push data member baris per baris
          members.forEach((member) => {
            dataRows.push([p.team_name, member, p.university]);
          });

          // HITUNG MERGE LOGIC
          // Kita mau merge Team Name (Col 0) dan University (Col 2)
          // Dari baris 'currentRow' sampai 'currentRow + jumlahMember - 1'
          const endRow = currentRow + members.length - 1;

          // Merge Team Name (Kolom 0)
          merges.push({
            s: { r: currentRow, c: 0 },
            e: { r: endRow, c: 0 },
          });

          // Merge University (Kolom 2)
          merges.push({
            s: { r: currentRow, c: 2 },
            e: { r: endRow, c: 2 },
          });

          // Update pointer baris buat tim selanjutnya
          currentRow += members.length;
        }
      });

      // 2. Bikin Workbook & Worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(dataRows);

      // 3. Terapkan Config MERGE ke Worksheet
      worksheet["!merges"] = merges;

      // (Opsional) Bikin lebar kolom biar rapi dikit
      worksheet["!cols"] = [
        { wch: 25 }, // Lebar Team Name
        { wch: 30 }, // Lebar Member Name
        { wch: 25 }, // Lebar University
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates");

      // 4. Download File
      XLSX.writeFile(workbook, "FutureTalk_Certificate_Data.xlsx");

      toast.success("Certificate data exported!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={"primary"}
      onClick={handleExport}
      disabled={isLoading || isExporting}
      className="bg-white hover:bg-neutral-50 hover:text-stone-500 border-neutral-200 text-neutral-700 h-10 px-4"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <FileBadge2 className="h-4 w-4 mr-2 text-orange-600" />
      )}
      Export Cert.
    </Button>
  );
}
