"use client";

import BreadcrumbGroup from "@/components/breadcrumb";
import PaginationControl from "@/components/form/pagination";
import Typography from "@/components/typography";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  AlertTriangle,
  CheckCircle2,
  Filter,
  PenLine,
  Search,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import ExportWithEmailButton from "./components/export-to-excel-button";
import {
  useGetREIISummary,
  useGetAllREIIParticipantsRaw,
  useGetREIITeams,
} from "./hooks";
import { StatusBadge } from "@/app/(dashboard)/admin/events/shared/status-badge";
import ExportCertificateButton from "./components/export-certificate-button";

const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="border-b border-neutral-100">
          <TableCell className="pl-6 py-4">
            <div className="h-4 w-4 rounded bg-neutral-200 animate-pulse" />
          </TableCell>
          <TableCell className="pl-2 py-4">
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

export default function REIIAdminPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [excludedStatus, setExcludedStatus] = React.useState<string | null>(
    null,
  );

  // state buat checkbox
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  // fect data pake custom hooks
  const { data: summary, isLoading: isSummaryLoading } = useGetREIISummary();
  const { data: participantsResponse, isLoading: isParticipantsLoading } =
    useGetREIITeams({
      page,
      limit: itemsPerPage,
      status: excludedStatus || undefined,
      search: searchQuery || undefined,
    });

  // hook buat export semua data REII (tanpa filter apapun, buat keperluan export Excel)
  const { data: allREIIData, isLoading: isAllLoading } =
    useGetAllREIIParticipantsRaw();

  // mapping data dari backend ke format yang dibutuhin difrontend
  const participants = participantsResponse?.data || [];
  const teams = participantsResponse?.data || [];
  const meta = participantsResponse?.meta;
  const isPageLoading = isParticipantsLoading || isSummaryLoading;

  const totalPages = meta?.total_page || 1;

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    { name: "REII", href: "/admin/events/reii" },
  ];

  const allStatuses = [
    "PENDING_PAYMENT",
    "PAYMENT_VERIFICATION",
    "PAYMENT_APPROVED",
    "PAYMENT_REJECTED",
    "ABSTRACT_VERIFICATION",
    "ABSTRACT_APPROVED",
    "ABSTRACT_REJECTED",
    "PROPOSAL_VERIFICATION",
    "PROPOSAL_APPROVED",
  ];

  // filtering logic
  const currentTableData = participants;

  // reset setiap query berubah
  React.useEffect(() => {
    setSelectedIds([]);
  }, [page, searchQuery, excludedStatus]);

  // checkbox logic
  const handleSelectAll = () => {
    if (selectedIds.length === currentTableData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentTableData.map((p) => p.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleOpenConfirm = () => {
    if (selectedIds.length === 0) return;
    setIsConfirmOpen(true);
  };

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
        {/* --- MODAL CONFIRMATION --- */}
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogContent className="bg-white rounded-2xl border-0 shadow-2xl p-6 sm:max-w-[440px] gap-4 font-sans">
            <AlertDialogHeader className="flex flex-col items-center gap-2 text-center sm:text-left sm:items-start">
              {/* Icon Warning */}
              <div className="p-3 bg-orange-50 rounded-full w-fit mb-1">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
              </div>

              <AlertDialogTitle className="text-xl font-bold text-neutral-900 font-['Sora']">
                Confirm Broadcast?
              </AlertDialogTitle>

              <AlertDialogDescription asChild>
                <div className="text-neutral-500 text-sm leading-relaxed w-full">
                  You are about to send the <strong>Case Reveal</strong> email
                  to{" "}
                  <span className="font-bold text-[#354FB4] py-0.5 rounded">
                    {selectedIds.length} participants
                  </span>
                  <div className="mt-4 mb-2 bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-left">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Selected Teams:
                    </p>
                    <ul className="space-y-1.5">
                      {participants
                        ?.filter((p) => selectedIds.includes(p.id))
                        .slice(0, 5)
                        .map((p) => (
                          <li
                            key={p.id}
                            className="text-sm font-medium text-neutral-700 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#354FB4]"></span>
                            {p.team_name}
                          </li>
                        ))}
                    </ul>

                    {selectedIds.length > 5 && (
                      <p className="mt-3 text-xs text-neutral-400 italic pl-3.5">
                        ...and {selectedIds.length - 5} other teams.
                      </p>
                    )}
                  </div>
                  <span className="block mt-2 text-xs text-neutral-400">
                    This action cannot be undone and updates the database
                    immediately.
                  </span>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="sm:justify-between gap-3 sm:gap-0 mt-2">
              <AlertDialogCancel
                disabled={isSending}
                className="mt-0 w-full sm:w-auto rounded-xl border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 font-medium h-11"
              >
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <Typography
              font="Titillium"
              variant="h2"
              weight="black"
              className="text-[#0F936D]"
            >
              REII
            </Typography>
            <BreadcrumbGroup items={BREADCRUMBS} />
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2">
              <ExportCertificateButton
                participants={allREIIData}
                isLoading={isAllLoading}
              />

              <ExportWithEmailButton
                participants={allREIIData}
                isLoading={isAllLoading}
              />
            </div>
          </div>
        </div>

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

          {/* Review */}
          <div className="flex items-center gap-4 justify-center sm:justify-start border-r border-dashed border-neutral-200 last:border-0 pr-4">
            <div className="bg-[#F97316] p-3 rounded-full text-white shadow-md shadow-orange-200">
              <PenLine className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <Typography
                font="Sora"
                className="text-[#F97316] font-medium text-sm"
              >
                Review
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
              placeholder="Search..."
              className="pl-10 bg-white border-neutral-200 h-11 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {/* Batch Filter */}
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
                  <SelectItem value="all">All Statuses</SelectItem>
                  {allStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/_/g, " ")}
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
                {/* Checkbox Header */}
                <TableHead className="w-[50px] py-4 pl-6">
                  <input
                    type="checkbox"
                    className="..."
                    disabled={isPageLoading}
                    checked={
                      currentTableData.length > 0 &&
                      selectedIds.length === currentTableData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableHead>

                <TableHead className="font-bold text-black py-4 pl-2 w-[30%]">
                  <Typography font="Sora" weight="bold">
                    Applicant
                  </Typography>
                </TableHead>
                <TableHead className="font-bold text-black py-4 text-center w-[20%]">
                  <Typography font="Sora" weight="bold">
                    Status
                  </Typography>
                </TableHead>
                <TableHead className="font-bold text-black py-4 text-center w-[30%]">
                  <Typography font="Sora" weight="bold">
                    University / Contact
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
              {isPageLoading ? (
                // --- STATE 1: SKELETON ---
                <TableSkeleton />
              ) : currentTableData.length > 0 ? (
                // --- STATE 2: DATA EXISTS ---
                currentTableData.map((participant) => {
                  const isCheckboxDisabled = false;
                  const isSelected = selectedIds.includes(participant.id);

                  return (
                    <TableRow
                      key={participant.id}
                      className={`hover:bg-neutral-50/50 border-b border-neutral-100 last:border-0 ${
                        isSelected ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <TableCell className="pl-6 py-4">
                        <input
                          type="checkbox"
                          disabled={isCheckboxDisabled}
                          className={`h-4 w-4 rounded border-gray-300 ${
                            isCheckboxDisabled
                              ? "opacity-30 cursor-not-allowed bg-neutral-100"
                              : "text-[#354FB4] focus:ring-[#354FB4] cursor-pointer"
                          }`}
                          checked={isSelected}
                          onChange={() => handleSelectOne(participant.id)}
                        />
                      </TableCell>

                      <TableCell className="font-medium pl-2 py-4">
                        <div className="flex flex-col">
                          <Typography
                            font="Sora"
                            weight="medium"
                            className="text-black"
                          >
                            {participant.supervisor_name}{" "}
                          </Typography>
                          <Typography
                            font="Sora"
                            className="text-xs text-neutral-400"
                          >
                            {participant.team_name}
                          </Typography>
                        </div>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <div className="flex flex-row justify-center items-center gap-1">
                          <StatusBadge status={participant.status} />
                        </div>
                      </TableCell>

                      <TableCell className="text-center py-4 text-neutral-600">
                        <Typography
                          font="Sora"
                          className="text-neutral-600 text-xs"
                        >
                          {participant.university}
                        </Typography>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <Link
                          href={`/admin/events/reii/${participant.id}`}
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
                  <TableCell colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                      <AlertCircle className="h-10 w-10 text-neutral-300 mb-2" />
                      <p>No participants found matching your criteria.</p>
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
