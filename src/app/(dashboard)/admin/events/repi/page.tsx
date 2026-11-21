"use client";

import BreadcrumbGroup from "@/components/breadcrumb";
import PaginationControl from "@/components/form/pagination";
import Typography from "@/components/typography";
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
import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import {
  AlertCircle,
  CheckCircle2,
  Filter,
  PenLine,
  Search,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useGetREPITeams } from "./hooks";
import { StatusBadge } from "@/app/(dashboard)/admin/events/shared/status-badge";

// --- COMPONENT: Skeleton Row ---
const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="border-b border-neutral-100">
          <TableCell className="pl-6 py-4">
            <div className="h-5 w-32 rounded bg-neutral-200 animate-pulse mb-1" />
            <div className="h-3 w-20 rounded bg-neutral-100 animate-pulse" />
          </TableCell>
          <TableCell className="text-center py-4">
            <div className="h-6 w-24 mx-auto rounded-full bg-neutral-200 animate-pulse" />
          </TableCell>
          <TableCell className="text-center py-4">
            <div className="h-4 w-32 mx-auto rounded bg-neutral-200 animate-pulse" />
          </TableCell>
          <TableCell className="text-center py-4">
            <div className="h-4 w-16 mx-auto rounded bg-neutral-200 animate-pulse" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default function REPIAdminPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [excludedStatus, setExcludedStatus] = React.useState<string | null>(
    null,
  );

  // Debounce search query
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 when search changes
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch Data with server-side pagination
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetREPITeams({
    page,
    limit: itemsPerPage,
    search: debouncedSearch || undefined,
    status: excludedStatus || undefined,
  });

  const teams = response?.data || [];
  const meta = response?.meta;
  const totalPages = meta?.total_page || 0;

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    { name: "REPI", href: "/admin/events/repi" },
  ];

  const allStatuses = React.useMemo(() => {
    if (!teams) return [];
    return Array.from(new Set(teams.map((t) => t.status)));
  }, [teams]);

  // Reset page when filter changes
  React.useEffect(() => {
    setPage(1);
  }, [excludedStatus]);

  // --- PAGINATION ADAPTER ---
  const tableAdapter = React.useMemo(
    () => ({
      getState: () => ({
        pagination: { pageIndex: page - 1, pageSize: itemsPerPage },
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

  const getStatusCounts = () => {
    // Note: These stats are based on current filtered/paginated data
    // For accurate total counts, backend should provide aggregate stats
    if (!teams) return { accepted: 0, pending: 0, rejected: 0, total: 0 };
    return {
      accepted: teams.filter(
        (t) =>
          t.status === "PAYMENT_APPROVED" || t.status === "SUBMISSION_APPROVED",
      ).length,
      pending: teams.filter(
        (t) =>
          t.status === "PENDING_PAYMENT" ||
          t.status === "PAYMENT_VERIFICATION" ||
          t.status === "SUBMISSION_VERIFICATION",
      ).length,
      rejected: teams.filter(
        (t) =>
          t.status === "PAYMENT_REJECTED" || t.status === "SUBMISSION_REJECTED",
      ).length,
      total: meta?.total_data || teams.length,
    };
  };
  const stats = getStatusCounts();

  return (
    <AdminLayouts withNavbar={true} withSidebar={true}>
      <div className="space-y-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <Typography
              font="Titillium"
              variant="h2"
              weight="black"
              className="text-[#0F936D]"
            >
              REPI
            </Typography>
            <BreadcrumbGroup items={BREADCRUMBS} />
          </div>
        </div>

        {/* --- STATS ROW --- */}
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
                {stats.accepted}
              </Typography>
            </div>
          </div>

          {/* Pending */}
          <div className="flex items-center gap-4 justify-center sm:justify-start border-r border-dashed border-neutral-200 last:border-0 pr-4">
            <div className="bg-[#F97316] p-3 rounded-full text-white shadow-md shadow-orange-200">
              <PenLine className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#F97316] font-medium text-sm"
              >
                Pending
              </Typography>
              <Typography
                font="Sora"
                className="text-[#F97316] font-bold text-3xl"
              >
                {stats.pending}
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

          {/* Total */}
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="bg-[#9CA3AF] p-3 rounded-full text-white shadow-md shadow-gray-200">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#9CA3AF] font-medium text-sm"
              >
                Total
              </Typography>
              <Typography
                font="Sora"
                className="text-[#9CA3AF] font-bold text-3xl"
              >
                {stats.total}
              </Typography>
            </div>
          </div>
        </div>

        {/* --- FILTERS ROW --- */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search team name or leader name..."
              className="pl-10 bg-white border-neutral-200 h-11 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="w-full md:w-48">
              <Select
                value={excludedStatus ?? "all"}
                onValueChange={(val) =>
                  setExcludedStatus(val === "all" ? null : val)
                }
              >
                <SelectTrigger className="bg-white text-gray-700 border-[#E5E5E5] rounded-lg h-11 font-normal w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Exclude Status" />
                  </div>
                </SelectTrigger>

                <SelectContent className="bg-white text-gray-700 border-[#E5E5E5] font-sans">
                  <SelectItem value="all">Show All Status</SelectItem>

                  {allStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      Exclude {status.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Items Per Page */}
            <div className="w-full md:w-32">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(val) => {
                  setItemsPerPage(Number(val));
                  setPage(1);
                }}
              >
                <SelectTrigger className="bg-white text-gray-700 border-[#E5E5E5] rounded-lg h-11 font-normal w-full justify-between focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder={`${itemsPerPage} Entries`} />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-700 border-[#E5E5E5] font-sans">
                  {[5, 10, 20, 50, 100].map((size) => (
                    <SelectItem
                      key={size}
                      value={size.toString()}
                      className="cursor-pointer hover:bg-neutral-100 focus:bg-neutral-100"
                    >
                      {size} Entries
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* --- TABLE CONTAINER --- */}
        <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-white">
              <TableRow className="hover:bg-transparent border-b border-neutral-100">
                <TableHead className="font-bold text-black py-4 pl-6 w-[30%]">
                  <Typography font="Sora" weight="bold">
                    Team Name
                  </Typography>
                </TableHead>
                <TableHead className="font-bold text-black py-4 text-center w-[25%]">
                  <Typography font="Sora" weight="bold">
                    Status
                  </Typography>
                </TableHead>
                <TableHead className="font-bold text-black py-4 text-center w-[25%]">
                  <Typography font="Sora" weight="bold">
                    Leader Name
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
              {isLoading ? (
                // --- STATE 1: SKELETON ---
                <TableSkeleton />
              ) : teams.length > 0 ? (
                // --- STATE 2: DATA EXISTS ---
                teams.map((team) => {
                  const leader = team.members?.find((m) => m.type === "LEADER");
                  const leaderName = leader?.name || "N/A";

                  return (
                    <TableRow
                      key={team.id}
                      className="hover:bg-neutral-50/50 border-b border-neutral-100 last:border-0"
                    >
                      <TableCell className="font-medium pl-6 py-4">
                        <Typography font="Sora" weight="medium">
                          {team.team_name}
                        </Typography>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <div className="flex flex-row justify-center items-center gap-1">
                          <StatusBadge status={team.status} />
                        </div>
                      </TableCell>

                      <TableCell className="text-center py-4 text-neutral-600">
                        <Typography font="Sora" className="text-neutral-600">
                          {leaderName}
                        </Typography>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <Link
                          href={`/admin/events/repi/${team.id}`}
                          className="text-sm font-semibold underline underline-offset-4 decoration-neutral-400 text-neutral-600 hover:text-black"
                        >
                          <Typography font="Sora" weight="bold">
                            See Details
                          </Typography>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                // --- STATE 3: EMPTY STATE ---
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                      <AlertCircle className="h-10 w-10 text-neutral-300 mb-2" />
                      <p>No teams found matching your criteria.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
