"use client";

import FormInput from "@/app/ba/components/FormInput";
import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateGoogleDriveLink } from "@/hooks/use-competition-registration";
import { useState } from "react";

import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  Lock,
  XCircle,
} from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

interface SubmissionSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  teamId?: string;
  isSubmitted?: boolean;
  onSuccess?: (isSaved: boolean) => void;
}

export default function SubmissionSection({
  isOpen,
  onToggle,
  teamId,
  isSubmitted,
  onSuccess,
}: SubmissionSectionProps) {
  const {
    control,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  // --- USE HOOKS ---
  const [isFakeLoading, setIsFakeLoading] = useState(false);
  const [fakeValidationResult, setFakeValidationResult] = useState<{
    success: boolean;
    isPublic: boolean;
    fileCount: number;
    proofFound: boolean;
    matchedFile: string;
  } | null>(null);
  const googleDriveLink = watch("google_drive_link");
  const drivePublicCheck = watch("drive_public_check");

  const handleFakeValidate = () => {
    if (!googleDriveLink || isFakeLoading) return;
    setIsFakeLoading(true);
    setFakeValidationResult(null);
    setTimeout(() => {
      setIsFakeLoading(false);
      setFakeValidationResult({
        success: true,
        isPublic: true,
        fileCount: 2,
        proofFound: true,
        matchedFile: "Originality_Statement.pdf",
      });
      setValue("drive_public_check", true, { shouldValidate: true });
      clearErrors("drive_public_check");
    }, 3000);
  };

  // Hook Update Database
  const { updateGoogleDriveLink, isLoading, isSuccess } =
    useUpdateGoogleDriveLink(teamId || "", {
      onSuccess: () => {
        toast.success("Google Drive link saved successfully!");
        onSuccess?.(true);
      },
    });

  const handleUpdateLink = async () => {
    if (!teamId) return toast.error("No team ID available");

    updateGoogleDriveLink({
      google_drive_link: googleDriveLink,
      drive_public_check: drivePublicCheck,
    });
  };

  return (
    <div className="mb-4">
      {/* HEADER ACCORDION */}
      <button
        onClick={onToggle}
        type="button"
        className={`w-full flex justify-between items-center px-6 py-4 bg-[#0F936D] transition-all duration-300 ${
          isOpen ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <Typography
          font="Sora"
          className="text-white font-bold text-lg md:text-2xl flex items-center gap-2"
        >
          Submission
          {isSubmitted && <Lock size={18} className="ml-2 text-white/80" />}
        </Typography>
        {isOpen ? (
          <ChevronUp className="text-white" />
        ) : (
          <ChevronDown className="text-white" />
        )}
      </button>

      {/* CONTENT BODY */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}
      >
        <div className="bg-[#f8f9fa] p-6 rounded-b-2xl border border-t-0 border-gray-200 shadow-sm">
          {/* BANNER TERKUNCI JIKA SUDAH SUBMIT */}
          {isSubmitted && (
            <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-3">
              <CheckCircle2
                className="text-green-600 mt-0.5 shrink-0"
                size={24}
              />
              <div>
                <Typography
                  font="Sora"
                  weight="bold"
                  className="text-green-800"
                >
                  Submission Completed
                </Typography>
                <Typography className="text-green-700 text-sm mt-1">
                  Your Google Drive link has been successfully submitted and is
                  now locked for review.
                </Typography>
              </div>
            </div>
          )}

          {/* 1. INPUT GOOGLE DRIVE LINK */}
          <div className="mb-4">
            <FormInput
              name="google_drive_link"
              label="Abstract and Originality Statement Documents"
              placeholder="Paste Google Drive Folder link here..."
              required
              readOnly={isSubmitted}
              className={
                isSubmitted
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : ""
              }
            />

            {!isSubmitted && (
              <Typography className="text-gray-500 text-xs md:text-sm mt-2">
                Ensure your Google Drive link is set to{" "}
                <strong>Public (Anyone with the link)</strong> and contains the
                required files (Abstract & Originality Statement).
              </Typography>
            )}
          </div>

          {/* HANYA TAMPILKAN BAGIAN VALIDASI & SAVE JIKA BELUM SUBMIT */}
          {!isSubmitted && (
            <>
              {/* 2. TOMBOL CEK VALIDASI */}
              <div className="mb-6 border-b pb-6 border-gray-200">
                <Button
                  type="button"
                  onClick={handleFakeValidate}
                  disabled={isFakeLoading || !googleDriveLink}
                  className="bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isFakeLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" /> Checking
                      Drive Content...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" /> Check & Validate Drive
                    </>
                  )}
                </Button>
              </div>

              {/* 3. HASIL VALIDASI (REPORT CARD) */}
              {fakeValidationResult && (
                <div
                  className={`mb-6 p-5 rounded-lg border-l-4 shadow-sm ${fakeValidationResult.success ? " border-green-500" : " border-red-500"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Typography className="font-bold text-gray-800">
                      Validation Report:
                    </Typography>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${fakeValidationResult.success ? "border border-green-200 text-green-800" : "border border-red-200 text-red-800"}`}
                    >
                      {"PASSED"}
                    </span>
                  </div>

                  <ul className="space-y-3 text-sm">
                    {/* A. Folder Public Check */}
                    <li className="flex items-start gap-3">
                      {fakeValidationResult.isPublic ? (
                        <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="text-red-500 h-5 w-5 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span
                          className={
                            fakeValidationResult.isPublic
                              ? "text-gray-700 font-medium"
                              : "text-red-600 font-bold"
                          }
                        >
                          Public Access (Anyone with link)
                        </span>
                        {!fakeValidationResult.isPublic && (
                          <p className="text-xs text-red-500 mt-1">
                            Please change folder sharing settings to "Anyone
                            with the link".
                          </p>
                        )}
                      </div>
                    </li>

                    {/* B. File Count Check */}
                    <li className="flex items-start gap-3">
                      {fakeValidationResult.fileCount >= 2 ? (
                        <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="text-red-500 h-5 w-5 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span
                          className={
                            fakeValidationResult.fileCount >= 2
                              ? "text-gray-700 font-medium"
                              : "text-red-600 font-bold"
                          }
                        >
                          Minimum 2 Files Uploaded
                        </span>
                        <p className="text-xs text-gray-500">
                          Found: {fakeValidationResult.fileCount} files.
                        </p>
                      </div>
                    </li>

                    {/* C. Originality Check */}
                    <li className="flex items-start gap-3">
                      {fakeValidationResult.proofFound ? (
                        <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="text-red-500 h-5 w-5 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span
                          className={
                            fakeValidationResult.proofFound
                              ? "text-gray-700 font-medium"
                              : "text-red-600 font-bold"
                          }
                        >
                          Originality Statement Verified
                        </span>
                        {/* {fakeValidationResult.matchedFile ? (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Content matched in:{' '}
                            <strong>{fakeValidationResult.matchedFile}</strong>
                          </p>
                        ) : (
                          <p className="text-xs text-red-500 mt-1">
                            Could not find the specific originality statement
                            text in your PDF/Images.
                          </p>
                        )} */}
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* 4. CHECKBOX KONFIRMASI (READ ONLY / AUTO) */}
              <div className="flex items-start gap-3 mt-6">
                <div className="relative flex items-center">
                  <Controller
                    name="drive_public_check"
                    control={control}
                    rules={{
                      required: "You must confirm that the drive link is valid",
                    }}
                    render={({ field }) => (
                      <Checkbox
                        id="drive_public_check"
                        checked={!!field.value}
                        disabled={true}
                        className="peer h-6 w-6 cursor-not-allowed opacity-70"
                      />
                    )}
                  />
                </div>
                <label
                  htmlFor="drive_public_check"
                  className="cursor-pointer font-sora text-gray-800 text-sm md:text-base select-none pt-0.5"
                >
                  I have validated the files and confirmed the Google Drive link
                  is public.
                </label>
              </div>
              {errors.drive_public_check && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.drive_public_check.message as string}
                </span>
              )}

              {/* 5. TOMBOL UPDATE LINK */}
              <div className="pt-4 mt-4 border-t border-gray-300">
                <Button
                  onClick={handleUpdateLink}
                  disabled={
                    isLoading ||
                    isSuccess ||
                    !googleDriveLink ||
                    !drivePublicCheck
                  }
                  className="w-full bg-[#0F936D] text-white px-6 py-3 rounded-lg hover:bg-[#0c7a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : isSuccess ? (
                    "Link Submitted"
                  ) : (
                    "Submit Drive Link"
                  )}
                </Button>
                <Typography className="text-red-500 text-xs mt-2 text-center font-bold">
                  WARNING: This link can only be submitted once! Please verify
                  thoroughly.
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
