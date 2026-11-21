"use client";
import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useDownloadOprecStaff } from "@/hooks/use-download-staff";
import { useOprecStaff } from "@/hooks/use-get-staff-by-division";
import { useOprecStaffSecondary } from "@/hooks/use-get-staff-secondary-division";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import React from "react";
import DashboardContainer from "../_components/dashboard-container";
import DashboardSummary from "../_components/dashboard-summary";
import { DataTable } from "../_components/dashboard-table";

export default function Page() {
  const params = useParams();
  const id = params.divisions;

  // State untuk Primary Division
  const [pagePrimary, setPagePrimary] = React.useState(1);
  const [takePrimary, setTakePrimary] = React.useState(10);

  // State untuk Secondary Division
  const [pageSecondary, setPageSecondary] = React.useState(1);
  const [takeSecondary, setTakeSecondary] = React.useState(10);

  // --- HOOK DOWNLOAD SECONDARY ---
  // <--- 3. Panggil hook download dan beri alias
  const {
    downloadData: downloadSecondary,
    isDownloading: isDownloadingSecondary,
  } = useDownloadOprecStaff();

  // <--- 4. Buat fungsi handler untuk tombol download
  const handleDownloadSecondary = () => {
    downloadSecondary({
      meta: metaSecondary,
      primaryId: primaryId, // Sesuai logic hook, primaryId adalah filter ID-nya
      // filterStatus: filterStatusSecondary, // Disabling unused filter for now
    });
  };

  const { primaryId, secondaryId } = {
    primaryId: id?.toString() ?? "",
    secondaryId: id?.toString() ?? "",
  };

  const { data, meta, isLoading } = useOprecStaff({
    primaryId,
    secondaryId,
    page: pagePrimary,
    take: takePrimary,
  });

  const {
    dataSecondary,
    meta: metaSecondary,
    isLoadingSecondary,
  } = useOprecStaffSecondary({
    primaryId,
    secondaryId,
    page: pageSecondary,
    take: takeSecondary,
  });
  const stats: {
    label: string;
    value: number;
    type: "accepted" | "interview" | "rejected" | "total";
  }[] = [
    { label: "Accepted", value: 9999, type: "accepted" },
    { label: "Interview", value: 9999, type: "interview" },
    { label: "Rejected", value: 9999, type: "rejected" },
    { label: "Total", value: 9999, type: "total" },
  ];

  type Applicant = {
    index: number;
    applicant: string;
    status: string;
    department: string;
  };

  const columns: ColumnDef<Applicant>[] = [
    { accessorKey: "index", header: "Index" },
    { accessorKey: "name", header: "Applicant" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "secondary_division", header: "Secondary Division" },
  ];

  const columnsSecondary: ColumnDef<Applicant>[] = [
    { accessorKey: "index", header: "Index" },
    { accessorKey: "name", header: "Applicant" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "primary_division", header: "Primary Division" },
  ];

  if (isLoading || isLoadingSecondary) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-40 rounded-xl" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>

        <div className="grid grid-cols-5 gap-4 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full rounded-lg" />
          ))}
        </div>

        <div className="space-y-3 mt-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 items-center">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-5 w-full rounded-md" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DashboardContainer
      title="Open Recruitment"
      id={id?.toString()}
      allowDownload
    >
      <DashboardSummary stats={stats} />

      <Typography variant="h5" font="FiraSans" className="mt-10">
        Choosing as Primary Divisions:
      </Typography>
      <DataTable
        columns={columns}
        data={data}
        take={takePrimary}
        setTake={setTakePrimary}
        page={pagePrimary}
        setPage={setPagePrimary}
        meta={meta}
        filterKey="status"
        subPage
        href={`/admin/${id}`}
      />

      <Typography variant="h5" font="FiraSans" className="mt-10">
        Choosing as Secondary Divisions
      </Typography>
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleDownloadSecondary}
          disabled={isDownloadingSecondary}
        >
          {isDownloadingSecondary
            ? "Downloading..."
            : "📥 Download Secondary List (.xlsx)"}
        </Button>
      </div>
      <DataTable
        columns={columnsSecondary}
        data={dataSecondary}
        take={takeSecondary}
        setTake={setTakeSecondary}
        page={pageSecondary}
        setPage={setPageSecondary}
        meta={metaSecondary}
        filterKey="status"
        subPage
        href={`/admin/${id}`}
      />
    </DashboardContainer>
  );
}
