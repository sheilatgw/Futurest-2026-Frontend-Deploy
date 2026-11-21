"use client";

import BreadcrumbGroup from "@/components/breadcrumb";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBaApplicants, useUpdateParticipantStatus } from "@/hooks/use-ba";
import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  PenLine,
  Search,
  XCircle,
} from "lucide-react";
import * as React from "react";
import { StatusBadge } from "./status-badge";

import PaginationControl from "@/components/form/pagination";
import { useRouter } from "next/navigation";

export default function BaAdminPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const { data: participants, isLoading: isParticipantsLoading } =
    useBaApplicants();

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    { name: "Brand Ambassador", href: "/admin/events/ba" },
  ];

  // filtering
  const filteredParticipants = React.useMemo(() => {
    if (!participants) return [];
    return participants.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.institution_name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [participants, searchQuery]);

  const totalItems = filteredParticipants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentTableData = React.useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredParticipants.slice(startIndex, endIndex);
  }, [page, filteredParticipants, itemsPerPage]);

  React.useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const tableAdapter = React.useMemo(
    () => ({
      getState: () => ({
        pagination: {
          pageIndex: page - 1,
          pageSize: itemsPerPage,
        },
      }),
      getPageCount: () => totalPages,
      setPageIndex: (newPageIndex: number) => setPage(newPageIndex + 1),
      previousPage: () => setPage((old) => Math.max(1, old - 1)),
      nextPage: () => setPage((old) => Math.min(totalPages, old + 1)),
      getCanPreviousPage: () => page > 1,
      getCanNextPage: () => page < totalPages,
    }),
    [page, totalPages],
  );

  type ParticipantStatus =
    | "ACCEPTED"
    | "REJECTED"
    | "UNDER_REVIEW"
    | "PENDING_REVIEW"
    | "INTERVIEW_SCHEDULED"
    | "INTERVIEW_COMPLETED";

  const REVISION_STATUSES: ParticipantStatus[] = [
    "INTERVIEW_SCHEDULED",
    "INTERVIEW_COMPLETED",
  ];

  const PENDING_STATUSES: ParticipantStatus[] = [
    "UNDER_REVIEW",
    "PENDING_REVIEW",
  ];

  const getStatusCounts = () => {
    if (!participants) {
      return {
        verified: 0,
        revision: 0,
        rejected: 0,
        unverified: 0,
        total: 0,
      };
    }

    return {
      verified: participants.filter((p) => p.status === "ACCEPTED").length,

      revision: participants.filter((p) => REVISION_STATUSES.includes(p.status))
        .length,

      rejected: participants.filter((p) => p.status === "REJECTED").length,

      unverified: participants.filter((p) =>
        PENDING_STATUSES.includes(p.status),
      ).length,

      total: participants.length,
    };
  };

  const stats = getStatusCounts();

  // console.log("participants:", participants);

  return (
    <AdminLayouts withNavbar={true} withSidebar={true}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <Typography
              font="FiraSans"
              variant="h3"
              weight="heavy-compressed"
              className="text-[#354FB4]"
            >
              Open Recruitment
            </Typography>
            <BreadcrumbGroup items={BREADCRUMBS} />
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-[#354FB4] hover:bg-[#2a3e91] rounded-lg h-10 px-4 flex items-center gap-2 whitespace-nowrap text-white font-medium"
              disabled
            >
              <FileText className="h-4 w-4" />
              Spread Sheets
            </Button>
          </div>
        </div>

        {/* Stats Row - Clean Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Accepted */}
          <div className="flex items-center gap-4 justify-center sm:justify-start border-r border-dashed border-neutral-200 last:border-0 pr-4">
            <div className="bg-[#10B981] p-3 rounded-full text-white shadow-md shadow-emerald-200">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#10B981] font-medium text-sm"
              >
                Accepted
              </Typography>
              <Typography
                font="Sora"
                className="text-[#10B981] font-bold text-3xl"
              >
                {stats.verified}
              </Typography>
            </div>
          </div>

          {/* Interview (Mapped to Revision) */}
          <div className="flex items-center gap-4 justify-center sm:justify-start border-r border-dashed border-neutral-200 last:border-0 pr-4">
            <div className="bg-[#F97316] p-3 rounded-full text-white shadow-md shadow-orange-200">
              <PenLine className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#F97316] font-medium text-sm"
              >
                Interview
              </Typography>
              <Typography
                font="Sora"
                className="text-[#F97316] font-bold text-3xl"
              >
                {stats.revision}
              </Typography>
            </div>
          </div>

          {/* Rejected */}
          <div className="flex items-center gap-4 justify-center sm:justify-start border-r border-dashed border-neutral-200 last:border-0 pr-4">
            <div className="bg-[#EF4444] p-3 rounded-full text-white shadow-md shadow-red-200">
              <XCircle className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#EF4444] font-medium text-sm"
              >
                Rejected
              </Typography>
              <Typography
                font="Sora"
                className="text-[#EF4444] font-bold text-3xl"
              >
                {stats.rejected}
              </Typography>
            </div>
          </div>

          {/* Total (Mapped to Total) */}
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="bg-[#9CA3AF] p-3 rounded-full text-white shadow-md shadow-gray-200">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#9CA3AF] font-medium text-sm"
              >
                Pending
              </Typography>
              <Typography
                font="Sora"
                className="text-[#9CA3AF] font-bold text-3xl"
              >
                {stats.unverified}
              </Typography>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or institution..."
              className="pl-10 bg-white border-neutral-200 h-11 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {/* Batch Filter Removed as it is not present in BA data */}

            <div className="w-full md:w-32">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(val) => {
                  setItemsPerPage(Number(val));
                  setPage(1);
                }}
              >
                <SelectTrigger className="bg-white dark:bg-white border-[#E5E5E5] dark:border-[#E5E5E5] rounded-lg h-11 text-[#6B7280] dark:text-[#6B7280] font-normal w-full justify-between">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder={`${itemsPerPage} Entries`} />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white border-[#E5E5E5] dark:border-[#E5E5E5] font-sans">
                  {[5, 10, 20, 50, 100].map((size) => (
                    <SelectItem
                      key={size}
                      value={size.toString()}
                      className="text-[#4B5563] dark:text-[#4B5563] focus:bg-[#FAFAFA] dark:focus:bg-[#FAFAFA] focus:text-black dark:focus:text-black cursor-pointer"
                    >
                      {size} Entries
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-neutral-200 overflow-hidden">
          {isParticipantsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : currentTableData.length > 0 ? (
            <Table>
              <TableHeader className="bg-white">
                <TableRow className="hover:bg-transparent border-b border-neutral-100">
                  <TableHead className="font-bold text-black py-4 pl-6 w-[25%]">
                    <Typography font="Sora" weight="bold">
                      Applicant
                    </Typography>
                  </TableHead>
                  <TableHead className="font-bold text-black py-4 text-center w-[20%]">
                    <Typography font="Sora" weight="bold">
                      Status
                    </Typography>
                  </TableHead>
                  <TableHead className="font-bold text-black py-4 text-center w-[35%]">
                    <Typography font="Sora" weight="bold">
                      Institution
                    </Typography>
                  </TableHead>
                  <TableHead className="font-bold text-black py-4 text-center w-[20%]">
                    <Typography font="Sora" weight="bold">
                      Details
                    </Typography>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTableData.map((participant) => (
                  <ParticipantRow
                    key={participant.id}
                    participant={participant}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
              <p>No applicants found matching your criteria.</p>
            </div>
          )}
        </div>

        <PaginationControl
          table={tableAdapter as any}
          data={[]}
          className="justify-end"
        />
      </div>
    </AdminLayouts>
  );
}

function ParticipantRow({ participant }: { participant: any }) {
  const router = useRouter();
  const updateStatusMutation = useUpdateParticipantStatus(participant.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (participant.status === "PENDING_REVIEW") {
      updateStatusMutation.mutate("UNDER_REVIEW", {
        onSuccess: () => {
          router.push(`/admin/events/ba/${participant.id}`);
        },
        onError: (error) => {
          console.error("Gagal update status:", error);
        },
      });
    } else {
      router.push(`/admin/events/ba/${participant.id}`);
    }
  };

  return (
    <TableRow className="hover:bg-neutral-50/50 border-b border-neutral-100 last:border-0">
      <TableCell className="font-medium pl-6 py-4">
        <Typography font="Sora" weight="medium">
          {participant.name}
        </Typography>
      </TableCell>
      <TableCell className="text-center py-4">
        <div className="flex flex-row justify-center items-center gap-1">
          <StatusBadge status={participant.status} />
        </div>
      </TableCell>
      <TableCell className="text-center py-4 text-neutral-600">
        <Typography font="Sora" className="text-neutral-600">
          {participant.institution_name}
        </Typography>
      </TableCell>
      <TableCell className="text-center py-4 flex justify-center items-center">
        <Button
          onClick={handleClick}
          disabled={updateStatusMutation.isPending}
          className="text-sm font-semibold underline underline-offset-4 decoration-neutral-400 text-neutral-600 hover:text-black"
        >
          {updateStatusMutation.isPending ? (
            <Typography
              font="Sora"
              weight="bold"
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </Typography>
          ) : (
            <Typography font="Sora" weight="bold">
              See Details
            </Typography>
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
}
