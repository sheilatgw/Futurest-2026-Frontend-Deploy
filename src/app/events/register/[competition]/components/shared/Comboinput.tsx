"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  id: string;
  name: string;
}

interface ComboInputProps {
  name: string; // name (string)
  idName: string; // hidden id field
  label: string;
  options: Option[];
  loading?: boolean;
  required?: boolean;
  placeholder?: string;
}

export default function ComboInput({
  name,
  idName,
  label,
  options,
  loading = false,
  required = false,
  placeholder = "",
}: ComboInputProps) {
  const { register, setValue, watch } = useFormContext();
  const value = watch(name);
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-bold text-gray-800 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        {...register(name)}
        placeholder={loading ? "Loading..." : placeholder}
        onFocus={() => setOpen(true)}
        onChange={() => setValue(idName, "")} // ⬅️ manual typing → reset ID
        disabled={loading}
        className={cn(
          "w-full px-4 py-2 border rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          loading && "bg-gray-100 cursor-not-allowed",
        )}
      />

      <input type="hidden" {...register(idName)} />

      {open && !loading && options.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow max-h-48 overflow-auto">
          {options
            .filter((opt) =>
              opt.name.toLowerCase().includes((value || "").toLowerCase()),
            )
            .map((opt) => (
              <div
                key={opt.id}
                onClick={() => {
                  setValue(name, opt.name);
                  setValue(idName, opt.id); // ⬅️ SET ID
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {opt.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
