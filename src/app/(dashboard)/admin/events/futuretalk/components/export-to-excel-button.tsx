"use client";

import {
  TeamDataExport,
  generateMinicaseScoreSheet,
} from "@/lib/excel-generator-minicase";
import { CheckCircle2, Download, FileText, Mail, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FutureTalkParticipant } from "../types";

// Interface (sama kayak sebelumnya)

interface FormattedTeam {
  id: string;
  name: string;
  title: string;
  abstract: string | null;
}

interface ExportWithEmailButtonProps {
  participants: FutureTalkParticipant[] | undefined;
  isLoading?: boolean;
}

export default function ExportWithEmailButton({
  participants,
  isLoading,
}: ExportWithEmailButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  // STATE PROGRESS
  const [progress, setProgress] = useState(0);

  // Filter Verified
  const eligibleParticipants = useMemo(() => {
    return (
      participants?.filter((p) => p.study_case_abstract_file != null) || []
    );
  }, [participants]);

  const count = eligibleParticipants.length;

  const handleGenerateExcel = async () => {
    const formattedTeams: FormattedTeam[] = eligibleParticipants.map((p) => ({
      id: p.id,
      name: p.team_name,
      title: `Submission by ${p.team_name}`,
      abstract: p.study_case_abstract_file || "N/A",
    }));

    // Passing callback progress
    await generateMinicaseScoreSheet(
      formattedTeams as TeamDataExport[],
      (percent) => {
        setProgress(percent);
      },
    );
  };

  const triggerEmail = async () => {
    if (count === 0) return;
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participants: eligibleParticipants.map((p) => ({
          id: p.id,
          email: p.team_leader_email,
          name: p.team_leader_name,
        })),
      }),
    });
    if (!response.ok) throw new Error("Email sending failed");
  };

  const handleExecute = async () => {
    if (count === 0) return;
    setIsProcessing(true);
    setProgress(0); // Reset

    try {
      // 1. Generate Excel (dengan Progress Bar)
      await handleGenerateExcel();

      // 2. Email (kalau dipilih)
      if (sendEmail) {
        toast.loading("Sending emails...", { duration: 2000 });
        await triggerEmail();
        toast.success(`Email sent to ${count} teams!`);
      } else {
        toast.success("Scoring sheet downloaded!");
      }

      setIsOpen(false);
      setSendEmail(false);
    } catch (error) {
      console.error(error);
      toast.error("Process failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isLoading || !participants}
          className="bg-[#0F936D] hover:bg-[#0c7a5a] text-white rounded-lg h-10 px-4 animate-in fade-in zoom-in duration-200 shadow-sm"
        >
          <div className="flex items-center gap-2 whitespace-nowrap font-medium">
            <Download className="w-4 h-4" />
            <span>Export Scoring Sheet</span>
            {!isLoading && count > 0 && (
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                {count}
              </span>
            )}
          </div>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white rounded-2xl border-0 shadow-2xl p-6 sm:max-w-[440px] font-sans">
        {/* TAMPILAN SAAT PROCESSING (CANVA STYLE) */}
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center animate-in fade-in zoom-in duration-300">
            {/* Icon Puter-puter Keren */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#0F936D] blur-xl opacity-20 rounded-full animate-pulse" />
              <Sparkles className="w-12 h-12 text-[#0F936D] animate-bounce" />
            </div>

            <div className="space-y-2 w-full max-w-[80%]">
              <h3 className="text-lg font-bold text-gray-900 font-['Sora']">
                Preparing your design...
              </h3>
              <p className="text-sm text-gray-500">
                Generating sheets for {count} teams
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-4 overflow-hidden">
                <div
                  className="bg-[#0F936D] h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 font-mono pt-1">
                {progress}%
              </p>
            </div>
          </div>
        ) : (
          /* TAMPILAN NORMAL (KONFIRMASI) */
          <>
            <AlertDialogHeader className="flex flex-col items-center gap-2 text-center sm:text-left sm:items-start">
              <div className="p-3 bg-green-50 rounded-full w-fit mb-1">
                <FileText className="w-6 h-6 text-[#0F936D]" />
              </div>

              <AlertDialogTitle className="text-xl font-bold text-neutral-900 font-['Sora']">
                Export Scoring Sheet
              </AlertDialogTitle>

              <AlertDialogDescription asChild>
                <div className="space-y-4 pt-2 text-sm text-neutral-600 w-full text-left">
                  <p>
                    Found <strong>{count} verified teams</strong>. Ready to
                    generate the Scoring Sheet Template.
                  </p>

                  <div className="bg-[#0F936D]/10 border border-[#0F936D]/20 p-3 rounded-xl flex gap-3 items-center">
                    <CheckCircle2 className="w-5 h-5 text-[#0F936D] shrink-0" />
                    <div className="text-[#0F936D] font-bold text-sm">
                      {count} Teams included
                    </div>
                  </div>

                  {/* {count > 0 && (
                    <div className="pt-4 mt-2 border-t border-gray-100">
                      <div
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 cursor-pointer"
                        onClick={() => setSendEmail(!sendEmail)}
                      >
                        <Checkbox
                          id="send-email"
                          checked={sendEmail}
                          onCheckedChange={(checked) =>
                            setSendEmail(checked as boolean)
                          }
                          className="mt-0.5 data-[state=checked]:bg-[#0F936D] data-[state=checked]:border-[#0F936D]"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="send-email"
                            className="text-sm font-semibold text-gray-900 cursor-pointer"
                          >
                            Send Email Notification?
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Also send email to all {count} teams.
                          </p>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="sm:justify-between gap-3 sm:gap-0 mt-6">
              <AlertDialogCancel className="mt-0 rounded-xl border-neutral-200 h-11">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleExecute();
                }}
                disabled={count === 0}
                className="bg-[#0F936D] hover:bg-[#0c7a5a] text-white rounded-xl h-11 px-6 font-medium shadow-lg shadow-green-900/10"
              >
                <div className="flex items-center gap-2">
                  {sendEmail ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {sendEmail ? "Export & Send" : "Download Sheet"}
                </div>
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
