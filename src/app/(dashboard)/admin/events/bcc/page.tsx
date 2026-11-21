"use client";

import BreadcrumbGroup from "@/components/breadcrumb";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useGetBCCTeams } from "./hooks";
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

export default function BCCAdminPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  // State untuk API Pagination
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [excludedStatus, setExcludedStatus] = React.useState<string | null>(
    null,
  );

  // Debounce search query
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset ke page 1 kalau search berubah
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch Data with server-side pagination
  const { data: response, isLoading } = useGetBCCTeams({
    page,
    limit: itemsPerPage,
    search: debouncedSearch || undefined,
    status: excludedStatus || undefined,
  });

  const teams = response?.data || [];
  const meta = response?.meta;

  // 🚀 LOGIC PERHITUNGAN PAGE DARI API 🚀
  const totalData = meta?.total_data || 0;
  const totalPages = Math.ceil(totalData / itemsPerPage) || 1;

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    { name: "BCC", href: "/admin/events/bcc" },
  ];

  // Reset page when filter changes
  React.useEffect(() => {
    setPage(1);
  }, [excludedStatus, itemsPerPage]);

  const getStatusCounts = () => {
    // Note: Karena API-nya membatasi hasil (take/limit), stats ini hanya menghitung data yg sedang tampil.
    // Jika backend punya endpoint /stats, lebih baik pakai itu.
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
      total: totalData, // Tampilkan Total asli dari Meta Database
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
              BCC
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

          {/* Total Data (API Accurate) */}
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="bg-[#9CA3AF] p-3 rounded-full text-white shadow-md shadow-gray-200">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#9CA3AF] font-medium text-sm"
              >
                Total Teams
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
                  {/* Hardcoded common statuses for better UX since API only returns paginated items */}
                  <SelectItem value="PENDING_PAYMENT">
                    Exclude Pending Payment
                  </SelectItem>
                  <SelectItem value="PAYMENT_VERIFICATION">
                    Exclude Payment Verification
                  </SelectItem>
                  <SelectItem value="SUBMISSION_VERIFICATION">
                    Exclude Submission Verification
                  </SelectItem>
                  <SelectItem value="SUBMISSION_REJECTED">
                    Exclude Submission Rejected
                  </SelectItem>
                  <SelectItem value="SUBMISSION_APPROVED">
                    Exclude Submission Approved
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items Per Page */}
            <div className="w-full md:w-32">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(val) => {
                  setItemsPerPage(Number(val));
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
        <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold text-gray-700 py-4 pl-6 w-[30%]">
                  <Typography font="Sora" weight="bold">
                    Team Name
                  </Typography>
                </TableHead>
                <TableHead className="font-bold text-gray-700 py-4 text-center w-[25%]">
                  <Typography font="Sora" weight="bold">
                    Status
                  </Typography>
                </TableHead>
                <TableHead className="font-bold text-gray-700 py-4 text-center w-[25%]">
                  <Typography font="Sora" weight="bold">
                    Leader Name
                  </Typography>
                </TableHead>
                <TableHead className="font-bold text-gray-700 py-4 text-center w-[20%]">
                  <Typography font="Sora" weight="bold">
                    Action
                  </Typography>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton />
              ) : teams.length > 0 ? (
                teams.map((team) => {
                  const leader = team.members?.find((m) => m.type === "LEADER");
                  const leaderName = leader?.name || "N/A";

                  return (
                    <TableRow
                      key={team.id}
                      className="hover:bg-blue-50/50 border-b border-neutral-100 last:border-0 transition-colors"
                    >
                      <TableCell className="font-medium pl-6 py-4">
                        <Typography
                          font="Sora"
                          weight="semibold"
                          className="text-gray-900"
                        >
                          {team.team_name}
                        </Typography>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <div className="flex flex-row justify-center items-center gap-1">
                          <StatusBadge status={team.status} />
                        </div>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <Typography
                          font="Sora"
                          className="text-gray-600 font-medium"
                        >
                          {leaderName}
                        </Typography>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <Link
                          href={`/admin/events/bcc/${team.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm"
                        >
                          Review
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 text-neutral-300 mb-3" />
                      <Typography
                        font="Sora"
                        weight="semibold"
                        className="text-gray-500"
                      >
                        No teams found
                      </Typography>
                      <Typography className="text-sm text-gray-400 mt-1">
                        Try adjusting your search or filters
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* 🚀 SERVER-SIDE PAGINATION CONTROLS 🚀 */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
            <Typography className="text-sm text-gray-500 font-medium">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {(page - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-gray-900">
                {Math.min(page * itemsPerPage, totalData)}
              </span>{" "}
              of <span className="font-bold text-gray-900">{totalData}</span>{" "}
              entries
            </Typography>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((old) => Math.max(1, old - 1))}
                disabled={page === 1 || isLoading}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex items-center gap-1 px-2">
                <Typography
                  font="Sora"
                  weight="semibold"
                  className="text-sm text-gray-700"
                >
                  Page {page} of {totalPages}
                </Typography>
              </div>

              <button
                onClick={() => setPage((old) => Math.min(totalPages, old + 1))}
                disabled={page === totalPages || isLoading || totalData === 0}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayouts>
  );
}
