"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, XCircle } from "lucide-react";
import { useState } from "react";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading: boolean;
}

export default function RejectModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: RejectModalProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white rounded-xl max-w-md font-sans">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-full">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              Reject Abstract
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Are you sure you want to reject this abstract? Please provide a
            reason for the rejection. This will be sent to the participant.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4 space-y-3">
          <Label
            htmlFor="reason"
            className="text-sm font-semibold text-gray-700"
          >
            Reason for Rejection <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            placeholder="e.g. Abstract does not meet the formatting guidelines..."
            className="min-h-[100px] border-gray-300 focus:ring-red-500 focus:border-red-500 bg-white"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="rounded-lg">
            Cancel
          </AlertDialogCancel>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-3 font-sora"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={isLoading || !reason.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Rejecting...
              </>
            ) : (
              "Confirm Reject"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
