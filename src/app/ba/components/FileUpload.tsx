"use client";

import { FileText, Upload, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type UploadFileProps = {
  name: string;
  supportFiles?: string[];
  accept?: Accept;
  className?: string;
  title: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
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
  subLabel,
  description,
  isRequired,
  variant,
}: UploadFileProps) {
  const {
    setValue,
    watch,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    register(name);
  }, [register, name]);

  const rawFile = watch(name);
  const file = rawFile && rawFile?.name ? rawFile : undefined;

  const errorMessage = errors[name]?.message as string | undefined;

  const truncateFileName = (
    fileName: string | undefined,
    maxLength: number = 25,
  ) => {
    if (!fileName) return "";
    if (fileName.length <= maxLength) return fileName;
    return fileName.slice(0, maxLength - 3) + "...";
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setValue(name, selectedFile, {
          shouldDirty: true,
          shouldValidate: true,
        });
        clearErrors(name);
      }
    },
    [name, setValue, clearErrors],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept,
    maxSize: 3 * 1024 * 1024,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      let msg = error.message;

      if (error.code === "file-too-large") {
        msg = "Ukuran file terlalu besar (Maks 3MB)";
      } else if (error.code === "file-invalid-type") {
        msg = "Format file tidak sesuai";
      }

      setError(name, { type: "manual", message: msg });
    },
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, undefined, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <section className={twMerge("flex w-full flex-col", className)}>
      <div className="mb-2">
        <h5
          className={twMerge(
            "text-sm font-bold text-gray-800 md:text-lg",
            isRequired && "after:ml-1 after:text-red-600 after:content-['*']",
          )}
        >
          {title}
        </h5>

        {subLabel && (
          <div className="text-sm text-gray-500 font-normal">{subLabel}</div>
        )}
      </div>

      <div
        {...getRootProps()}
        className={twMerge(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200",
          errorMessage
            ? "border-red-500 bg-red-50 hover:bg-red-100"
            : isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-400 bg-gray-50 hover:border-blue-500 hover:bg-gray-100",
          variant === "md" ? "py-6 px-4" : "py-8 px-6",
          "min-h-[120px] text-center",
        )}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="flex w-full flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
            <FileText size={32} className="text-blue-600" />

            <div className="relative group w-full max-w-[200px]">
              <p
                title={file.name}
                className="mx-auto truncate text-sm font-semibold text-gray-900"
              >
                {truncateFileName(file.name)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {((file.size || 0) / 1024).toFixed(1)} KB
              </p>

              <button
                type="button"
                onClick={handleRemove}
                className="absolute -right-4 -top-8 rounded-full bg-red-100 p-1.5 text-red-600 transition hover:bg-red-200 hover:scale-110 shadow-sm"
                title="Hapus file"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload
              size={32}
              className={twMerge(
                "transition-colors",
                isDragActive ? "text-blue-600 scale-110" : "text-gray-400",
              )}
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isDragActive
                  ? "Lepaskan file di sini..."
                  : "Klik atau seret file ke sini"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Max 3MB • {supportFiles.join(", ")}
              </p>
              {description && (
                <p className="mt-2 text-xs text-gray-400">{description}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="mt-2 text-sm font-medium text-red-600 animate-pulse">
          {errorMessage}
        </p>
      )}
    </section>
  );
}
