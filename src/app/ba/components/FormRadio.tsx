"use client";

import { cn } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
  hasInput?: boolean;
  inputName?: string;
  inputPlaceholder?: string;
}

interface FormRadioProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
  className?: string;
}

export default function FormRadio({
  name,
  label,
  options,
  required = false,
  className,
}: FormRadioProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ control, name });

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className={cn("mb-6", className)}>
      <label className="block text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <div key={option.value} className="flex flex-col">
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <div className="relative flex items-center">
                <input
                  {...register(name)}
                  type="radio"
                  value={option.value}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:border-[#3b6db3] peer-checked:border-[6px] transition-all bg-white" />
              </div>

              <span className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">
                {option.label}
              </span>
            </label>

            {option.hasInput &&
              currentValue === option.value &&
              option.inputName && (
                <div className="ml-8 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <input
                    {...register(option.inputName)}
                    type="text"
                    placeholder={option.inputPlaceholder}
                    className={cn(
                      "w-full max-w-md px-4 py-2 border rounded-lg text-sm transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-[#3b6db3] focus:border-transparent",
                      errors[option.inputName]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300",
                    )}
                  />

                  {errors[option.inputName]?.message && (
                    <p className="mt-1 text-xs text-red-500 animate-pulse font-medium">
                      {errors[option.inputName]?.message as string}
                    </p>
                  )}
                </div>
              )}
          </div>
        ))}
      </div>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
