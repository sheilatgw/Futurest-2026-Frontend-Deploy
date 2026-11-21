// components/FormInput.tsx
"use client";

import { cn } from "@/lib/utils"; // jika pakai shadcn/ui atau utility serupa, jika tidak bisa dihapus
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string; // wajib: nama field di form schema
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
}

export default function FormInput({
  defaultValue = "",
  name,
  label,
  placeholder = "",
  type = "text",
  required = false,
  className,
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // ambil context dari FormProvider

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-800 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={cn(
          "w-full px-4 py-2 border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "text-gray-700 placeholder-gray-400 transition-colors",
          error ? "border-red-500 focus:ring-red-500" : "",
          className,
        )}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
