"use client";

import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import BreadcrumbGroup from "@/components/breadcrumb";
import PaginationControl from "@/components/form/pagination";
import Typography from "@/components/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { useEmailLogs } from "@/hooks/use-email-hooks-minicase";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Loader2,
  PenLine,
  Search,
  Send,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "react-hot-toast";
import ExportWithEmailButton from "./components/export-to-excel-button";
import ExportCertificateButton from "./components/exportt-certificate-button";
import {
  useGetAllFutureTalkParticipants,
  useGetFutureTalkBatches,
  useGetFutureTalkParticipants,
} from "./hooks";
import { StatusBadge } from "./status-badge";

// --- COMPONENT: Skeleton Row ---
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

export default function FutureTalkAdminPage() {
  const [selectedBatchId, setSelectedBatchId] = React.useState<
    string | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  // State Checkbox & Action
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  // 1. Fetch Data dari Backend Utama
  const { data: batches } = useGetFutureTalkBatches();

  const { data: singleBatchParticipants, isLoading: isSingleBatchLoading } =
    useGetFutureTalkParticipants(selectedBatchId);
  const { data: allParticipants, isLoading: isAllParticipantsLoading } =
    useGetAllFutureTalkParticipants(batches);

  // 2. Fetch Data dari Firebase (Sidecar DB)
  const { sentLogIds, loading: isEmailLogsLoading } = useEmailLogs();

  // Determine Data Source
  const participants = selectedBatchId
    ? singleBatchParticipants
    : allParticipants;

  // Gabungan Loading State
  const isDataLoading = selectedBatchId
    ? isSingleBatchLoading
    : isAllParticipantsLoading;
  const isPageLoading = isDataLoading || isEmailLogsLoading;

  const BREADCRUMBS = [
    { name: "Dashboard", href: "/admin" },
    { name: "Event", href: "/admin/events/futuretalk" },
  ];

  const [excludedStatus, setExcludedStatus] = React.useState<string | null>(
    null,
  );

  const allStatuses = React.useMemo(() => {
    if (!participants) return [];
    return Array.from(new Set(participants.map((p) => p.status)));
  }, [participants]);

  // Filtering Logic
  const filteredParticipants = React.useMemo(() => {
    if (!participants) return [];

    return participants.filter((p) => {
      const matchSearch =
        p.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.team_leader_name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = excludedStatus ? p.status !== excludedStatus : true;

      return matchSearch && matchStatus;
    });
  }, [participants, searchQuery, excludedStatus]);

  const totalItems = filteredParticipants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentTableData = React.useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredParticipants.slice(startIndex, endIndex);
  }, [page, filteredParticipants, itemsPerPage]);

  // Reset page & selection pas filter ganti
  React.useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [searchQuery, selectedBatchId]);

  // --- LOGIC CHECKBOX ---
  const handleSelectAll = () => {
    const eligibleParticipants = currentTableData.filter((p) => {
      const isTargetStatus = p.status === "ABSTRACT_VERIFICATION";
      const isAlreadySent = sentLogIds.has(p.id);
      return isTargetStatus && !isAlreadySent;
    });

    const eligibleIds = eligibleParticipants.map((p) => p.id);
    const isAllSelected =
      eligibleIds.length > 0 &&
      eligibleIds.every((id) => selectedIds.includes(id));

    if (isAllSelected) {
      setSelectedIds(selectedIds.filter((id) => !eligibleIds.includes(id)));
    } else {
      const newSet = new Set([...selectedIds, ...eligibleIds]);
      setSelectedIds(Array.from(newSet));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // --- TRIGGER MODAL ---
  const handleOpenConfirm = () => {
    if (selectedIds.length === 0) return;
    setIsConfirmOpen(true);
  };

  // --- EKSEKUSI KIRIM EMAIL ---
  const executeSendEmail = async () => {
    const participantsToSend = participants?.filter((p) =>
      selectedIds.includes(p.id),
    );
    if (!participantsToSend || participantsToSend.length === 0) return;

    setIsSending(true);

    // Setup Promise Toast
    const toastPromise = fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participants: participantsToSend.map((p) => ({
          id: p.id,
          email: p.team_leader_email,
          name: p.team_leader_name,
        })),
      }),
    }).then(async (res) => {
      if (!res.ok) throw new Error("Server Error");
      return res.json();
    });

    try {
      await toast.promise(toastPromise, {
        loading: "Sending emails...",
        success: `Successfully sent to ${participantsToSend.length} participants!`,
        error: "Failed to send emails.",
      });

      setSelectedIds([]);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

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
    if (!participants)
      return { verified: 0, revision: 0, rejected: 0, unverified: 0, total: 0 };
    return {
      verified: participants.filter((p) => p.status === "PAID").length,
      revision: participants.filter((p) => p.status === "REVISI").length,
      rejected: participants.filter((p) => p.status === "REJECTED").length,
      unverified: participants.filter(
        (p) => p.status === "PAYMENT_VERIFICATION",
      ).length,
      total: participants.length,
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

              {/* 🔥 FIX: Tambah 'asChild' dan bungkus isi dengan <div> */}
              <AlertDialogDescription asChild>
                <div className="text-neutral-500 text-sm leading-relaxed w-full">
                  You are about to send the <strong>Case Reveal</strong> email
                  to{" "}
                  <span className="font-bold text-[#354FB4] py-0.5 rounded">
                    {selectedIds.length} participants
                  </span>
                  .{/* PREVIEW LIST NAMA TIM */}
                  <div className="mt-4 mb-2 bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-left">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Selected Teams:
                    </p>
                    <ul className="space-y-1.5">
                      {participants
                        ?.filter((p) => selectedIds.includes(p.id))
                        .slice(0, 5) // Batasin cuma nampilin 5 nama
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

                    {/* Kalau lebih dari 5, kasih tulisan sisanya */}
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

              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  executeSendEmail();
                }}
                disabled={isSending}
                className="w-full sm:w-auto bg-[#354FB4] hover:bg-[#2a3e91] text-white rounded-xl h-11 px-6 font-medium shadow-lg shadow-blue-900/10 transition-all"
              >
                {isSending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Yes, Send Emails"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <Typography
              font="FiraSans"
              variant="h3"
              weight="heavy-compressed"
              className="text-[#354FB4]"
            >
              Futuretalk Registrant
            </Typography>
            <BreadcrumbGroup items={BREADCRUMBS} />
          </div>
          <div className="flex gap-2">
            {/* Dynamic Button Logic */}
            {selectedIds.length > 0 ? (
              <Button
                onClick={handleOpenConfirm}
                disabled={isSending}
                className="bg-[#354FB4] hover:bg-[#2a3e91] rounded-lg h-10 px-4 animate-in fade-in zoom-in duration-200 flex items-center gap-2 whitespace-nowrap text-white font-medium"
              >
                <Send className="h-4 w-4" />
                Send Email ({selectedIds.length})
              </Button>
            ) : (
              <div className="flex gap-2">
                {/* 1. Tombol Export Sertifikat (BARU) */}
                <ExportCertificateButton
                  participants={participants}
                  isLoading={isDataLoading}
                />

                {/* 2. Tombol Export Scoring (LAMA) */}
                <ExportWithEmailButton
                  participants={participants}
                  isLoading={isDataLoading}
                />
              </div>
            )}
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
                {stats.verified}
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
                  <SelectItem value="all">Show All Status</SelectItem>

                  {allStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      Exclude {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <Select
                value={selectedBatchId ?? "all"}
                onValueChange={(val) =>
                  setSelectedBatchId(val === "all" ? undefined : val)
                }
              >
                <SelectTrigger className="bg-white text-gray-700 border-[#E5E5E5] rounded-lg h-11 font-normal w-full justify-between focus:ring-0 focus:ring-offset-0">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="All Batches" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-700 border-[#E5E5E5] font-sans">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-neutral-100 focus:bg-neutral-100"
                  >
                    All Batches
                  </SelectItem>
                  {batches?.map((batch) => (
                    <SelectItem
                      key={batch.id}
                      value={batch.id}
                      className="cursor-pointer hover:bg-neutral-100 focus:bg-neutral-100"
                    >
                      {batch.name}
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
                    className="h-4 w-4 rounded border-gray-300 text-[#354FB4] focus:ring-[#354FB4] cursor-pointer"
                    disabled={isPageLoading}
                    checked={
                      !isPageLoading &&
                      currentTableData.length > 0 &&
                      currentTableData
                        .filter(
                          (p) =>
                            p.status === "ABSTRACT_VERIFICATION" &&
                            !sentLogIds.has(p.id),
                        )
                        .every((p) => selectedIds.includes(p.id)) &&
                      currentTableData.some(
                        (p) =>
                          p.status === "ABSTRACT_VERIFICATION" &&
                          !sentLogIds.has(p.id),
                      )
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
              {isPageLoading ? (
                // --- STATE 1: SKELETON ---
                <TableSkeleton />
              ) : currentTableData.length > 0 ? (
                // --- STATE 2: DATA EXISTS ---
                currentTableData.map((participant) => {
                  const isTargetStatus =
                    participant.status === "ABSTRACT_VERIFICATION";
                  const isAlreadySent = sentLogIds.has(participant.id);
                  const isCheckboxDisabled = !isTargetStatus || isAlreadySent;
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
                        <Typography font="Sora" weight="medium">
                          {participant.team_name}
                        </Typography>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <div className="flex flex-row justify-center items-center gap-1">
                          <StatusBadge status={participant.status} />
                          {/* Label Sent Email */}
                          {isTargetStatus && isAlreadySent && (
                            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Sent
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-center py-4 text-neutral-600">
                        <Typography font="Sora" className="text-neutral-600">
                          {participant.team_leader_name}
                        </Typography>
                      </TableCell>

                      <TableCell className="text-center py-4">
                        <Link
                          href={`/admin/events/futuretalk/${participant.id}`}
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
