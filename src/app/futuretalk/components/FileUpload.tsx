// components/UploadFile.tsx
"use client";

import { FileText, Upload } from "lucide-react";
import { ChangeEvent, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type UploadFileProps = {
  name: string;
  supportFiles?: string[];
  accept?: Accept;
  className?: string;
  title: string;
  description?: string;
  isRequired?: boolean;
  variant: "md" | "lg";
};

export default function UploadFile({
  name,
  supportFiles = [],
  accept = { "image/*": [], "application/pdf": [] },
  className,
  title,
  description,
  isRequired,
  variant,
}: UploadFileProps) {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const file = watch(name) as File | undefined;
  const error = errors[name]?.message as string | undefined;

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      const safeAccepted = Array.isArray(acceptedFiles) ? acceptedFiles : [];
      const safeRejected = Array.isArray(rejectedFiles) ? rejectedFiles : [];

      if (safeRejected.length > 0) {
        const firstError = safeRejected[0]?.errors?.[0];
        const message = firstError
          ? firstError.code === "file-too-large"
            ? "Ukuran file terlalu besar (maks 3MB)"
            : firstError.code === "file-invalid-type"
              ? "Tipe file tidak didukung"
              : firstError.message || "File tidak valid"
          : "Terjadi kesalahan saat upload";

        alert(message);
        return;
      }

      if (safeAccepted.length > 0) {
        const selectedFile = safeAccepted[0];
        setValue(name, selectedFile, { shouldValidate: true });
        trigger(name);
      }
    },
    [name, setValue, trigger],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 3000000,
    accept,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setValue(name, selectedFile, { shouldValidate: true });
      trigger(name);
    }
  };

  // Fungsi truncate yang aman
  const truncateFileName = (
    fileName: string | undefined,
    maxLength: number = 30,
  ) => {
    if (!fileName) return "File belum dipilih";
    if (fileName.length <= maxLength) return fileName;
    return fileName.slice(0, maxLength - 3) + "...";
  };

  return (
    <section className={twMerge("flex w-full flex-col", className)}>
      <div className="mb-2">
        <h5
          className={twMerge(
            "text-sm font-semibold text-gray-800",
            isRequired && "after:ml-1 after:text-red-600 after:content-['*']",
          )}
        >
          {title}
        </h5>
      </div>

      <div
        {...getRootProps()}
        className={twMerge(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors",
          error
            ? "border-red-500 bg-gray-50"
            : "border-gray-400 hover:border-blue-500 bg-gray-50",
          variant === "md" ? "py-6 px-4" : "py-8 px-6",
          "min-h-[120px] text-center",
        )}
      >
        <input {...getInputProps()} onChange={handleChange} />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            <FileText size={32} className="text-blue-600" />
            <div className="w-full max-w-full">
              <p
                title={file.name}
                className="text-sm font-semibold text-gray-900 truncate max-w-[240px] mx-auto"
              >
                {truncateFileName(file.name)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {file?.size ? (file.size / 1024).toFixed(1) : 0} KB •{" "}
                {supportFiles.join(" / ")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload size={32} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Klik atau drag file di sini
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Maks 3MB • {supportFiles.join(" / ")}
              </p>
              {description && (
                <p className="text-xs text-gray-400 mt-2">{description}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
    </section>
  );
}
