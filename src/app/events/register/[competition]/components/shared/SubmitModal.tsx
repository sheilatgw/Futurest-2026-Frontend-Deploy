"use client";

import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { AlertCircle, Loader2, X } from "lucide-react";
import Image from "next/image";

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  isError?: boolean;
}

export default function ConfirmSubmitModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  isError = false,
}: ConfirmSubmitModalProps) {
  if (!isOpen) return null;

  // loader
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
        <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300 min-w-[250px]">
          <Loader2 className="w-12 h-12 text-[#3A6AB2] animate-spin" />
          <div className="text-center space-y-2">
            <Typography
              font="Sora"
              className="text-lg sm:text-xl font-bold text-gray-900"
            >
              Processing...
            </Typography>
            <Typography className="text-sm text-gray-500">
              Please wait while we submit your data.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  // kalo gagal submit
  if (isError) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all duration-300">
        <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>

          <p className="text-lg font-sora sm:text-2xl font-bold text-gray-900 mb-2">
            Submission Failed
          </p>

          <Typography
            font="Sora"
            className="text-gray-600 mb-8 text-xs sm:text-base"
          >
            Something went wrong while submitting your data. Please try again
            later or contact support if the problem persists.
          </Typography>

          <Button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-800 transition-colors"
          >
            Close & Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all duration-300">
      <div
        className="bg-white w-full max-w-lg rounded-[40px] relative shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-6 right-6 p-2 rounded-lg bg-[#DC3E40] hover:bg-red-600 transition-colors text-white shadow-md disabled:opacity-50 z-10"
        >
          <X size={20} strokeWidth={3} />
        </Button>

        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/ba/tangan.svg"
            alt="Review Submission"
            width={540}
            height={334}
            className="pt-12 select-none"
            priority
          />
          <div className="p-8 md:p-10">
            <Typography
              font="Sora"
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              Review Before Submitting
            </Typography>

            <Typography
              font="Sora"
              className="text-gray-900 text-sm md:text-base leading-normal lg:text-lg mb-8 max-w-md mx-auto"
            >
              Please review your answers and uploaded documents carefully before
              submitting. Once submitted, changes cannot be made.
            </Typography>

            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#3A6AB2] text-[#3A6AB2] font-bold hover:bg-blue-50 transition-colors"
              >
                Back
              </Button>

              <Button
                variant="primary"
                onClick={onConfirm}
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 rounded-2xl bg-[#FFCE1F] text-gray-900 font-bold hover:bg-[#e6b91c] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed border-none"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
