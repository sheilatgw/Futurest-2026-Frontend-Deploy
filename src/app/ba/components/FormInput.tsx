"use client";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

// Kita gabungkan tipe Input dan Textarea agar props seperti 'rows' bisa terbaca
interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  label: string | React.ReactNode;
  className?: string;
  required?: boolean;
  rows?: number;
}

export default function FormInput({
  name,
  label,
  className,
  required,
  type = "text",
  rows = 5,
  ...props
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  const baseClassName = cn(
    "w-full px-4 py-2 border rounded-lg transition-all duration-200",
    "bg-white text-gray-700 placeholder-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-opacity-50",
    "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
    errorMessage
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500",
    className,
  );

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          rows={rows}
          {...(register(name) as any)}
          className={baseClassName}
          {...props}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, {
            valueAsNumber: type === "number",
          })}
          className={baseClassName}
          {...props}
        />
      )}

      {errorMessage && (
        <p className="mt-1 text-sm text-red-600 font-medium animate-pulse [animation-duration:200ms]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
