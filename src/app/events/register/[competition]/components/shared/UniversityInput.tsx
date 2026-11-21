"use client";

import { useInstitutionSearch } from "@/hooks/use-institution-search";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface SchoolInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function SchoolInput({
  name,
  label,
  placeholder,
  required,
}: SchoolInputProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  // Use HIGH_SCHOOL type for REII competition (for high school students)
  const {
    query,
    setQuery,
    results,
    isLoading,
    isTyping,
    isOpen,
    setIsOpen,
    setResults,
  } = useInstitutionSearch("HIGH_SCHOOL");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentValue = watch(name);
  const errorMessage = errors[name]?.message as string | undefined;

  useEffect(() => {
    if (currentValue && currentValue !== query) {
      setQuery(currentValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleSelect = (instName: string) => {
    setValue(name, instName, { shouldValidate: true, shouldDirty: true });
    setQuery(instName);
    setResults([]);
    setIsOpen(false);
  };

  const showModal = isOpen && query.length >= 3;

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={wrapperRef}>
      <label htmlFor={name} className="font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          {...register(name)}
          id={name}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          className={`
            w-full rounded-xl border p-3 focus:outline-none focus:ring-2 transition-all 
            bg-white border-gray-300 focus:ring-[#3A6AB2]
            ${errorMessage ? "border-red-500 focus:ring-red-200" : ""}
          `}
          onChange={(e) => {
            register(name).onChange(e);
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && showModal && results.length > 0) {
              e.preventDefault();
              handleSelect(results[0].label);
            }
          }}
        />

        {/* Loading Spinner */}
        {(isLoading || isTyping) && (
          <div className="absolute right-3 top-3.5 text-gray-400">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A6AB2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3A6AB2]"></span>
            </span>
          </div>
        )}
      </div>

      {/* Dropdown Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 top-[85px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            <ul className="py-2">
              {isTyping && (
                <li className="px-4 py-3 text-sm text-gray-500 italic flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  Waiting for you to finish typing...
                </li>
              )}
              {!isTyping && isLoading && (
                <li className="px-4 py-3 text-sm text-[#3A6AB2] font-medium flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#3A6AB2] border-t-transparent rounded-full animate-spin"></div>
                  Searching schools...
                </li>
              )}
              {!isTyping &&
                !isLoading &&
                results.length > 0 &&
                results.map((item, idx) => (
                  <li
                    key={`${idx}-${item.label}`}
                    onClick={() => handleSelect(item.label)}
                    className="px-4 py-2 hover:bg-[#3A6AB2] hover:text-white cursor-pointer transition-colors text-sm text-gray-700"
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-xs opacity-70">{item.subLabel}</div>
                  </li>
                ))}
              {!isTyping &&
                !isLoading &&
                results.length === 0 &&
                query.length >= 3 && (
                  <li className="px-4 py-3 text-sm text-gray-500">
                    No school found. Type manually.
                  </li>
                )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {errorMessage && (
        <span className="mt-1 text-sm text-red-600 font-medium animate-pulse [animation-duration:200ms]">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
