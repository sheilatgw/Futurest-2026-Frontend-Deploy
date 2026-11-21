"use client";

import { FileBadge2, Loader2 } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";
import Button from "@/components/buttons/button";
import { REIIParticipant } from "../types";

interface ExportCertificateButtonProps {
  participants: REIIParticipant[] | undefined;
  isLoading: boolean;
}

export default function ExportCertificateButton({
  participants,
  isLoading,
}: ExportCertificateButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    const eligibleParticipants =
      participants?.filter((p) => p.competition_name === "REII") || [];

    if (eligibleParticipants.length === 0) {
      toast.error("No REII data to export");
      return;
    }

    setIsExporting(true);

    try {
      // header
      const dataRows: (string | null)[][] = [
        ["Team Name", "Member Name", "University"],
      ];

      const merges: XLSX.Range[] = [];
      let currentRow = 1;

      eligibleParticipants.forEach((p) => {
        // ambil member dari field members dulu, kalau kosong baru fallback ke team_leader_name
        const membersList = p.members?.map((m) => m.name) || [];

        // kalau member kosong tetep push seadanya
        const finalMembers =
          membersList.length > 0 ? membersList : [p.team_leader_name || ""];

        finalMembers.forEach((memberName) => {
          dataRows.push([p.team_name, memberName, p.university]);
        });

        // logic merge
        if (finalMembers.length > 1) {
          const endRow = currentRow + finalMembers.length - 1;

          merges.push({
            s: { r: currentRow, c: 0 },
            e: { r: endRow, c: 0 },
          });

          merges.push({
            s: { r: currentRow, c: 2 },
            e: { r: endRow, c: 2 },
          });
        }

        currentRow += finalMembers.length;
      });

      // generate workbook & worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(dataRows);

      // masukin logic merges
      worksheet["!merges"] = merges;

      // atur lebar kolom biar rapi
      worksheet["!cols"] = [
        { wch: 35 }, // Team Name
        { wch: 40 }, // Member Name
        { wch: 35 }, // University
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates");

      // dowbload file
      XLSX.writeFile(workbook, "REII_Certificate_Data.xlsx");

      toast.success(
        `Successfully exported ${eligibleParticipants.length} teams!`,
      );
    } catch (error) {
      console.error("Export Error:", error);
      toast.error("Failed to generate certificate data");
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
