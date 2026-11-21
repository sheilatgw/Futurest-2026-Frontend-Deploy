"use client";

import { useCitySearch } from "@/hooks/use-city-search";
import { AnimatePresence, motion } from "framer-motion"; // Kalo lu pake framer-motion
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface CityInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function CityInput({
  name,
  label,
  placeholder,
  required,
}: CityInputProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const {
    query,
    setQuery,
    results,
    isLoading,
    isTyping, // Ambil state baru
    isOpen,
    setIsOpen,
    setResults,
  } = useCitySearch();

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

  const handleSelect = (cityName: string) => {
    setValue(name, cityName, { shouldValidate: true, shouldDirty: true });
    setQuery(cityName);
    setResults([]);
    setIsOpen(false);
  };

  // Logic kapan modal harus tampil
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
            w-full rounded-xl border p-3 focus:outline-none focus:ring-2 transition-all bg-white
            ${
              errorMessage
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#3A6AB2]"
            }
          `}
          onChange={(e) => {
            register(name).onChange(e);
            setQuery(e.target.value);
            // Paksa buka saat ngetik
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={(e) => {
            // Pilih item pertama otomatis jika enter ditekan
            if (e.key === "Enter" && showModal && results.length > 0) {
              e.preventDefault();
              handleSelect(results[0].name);
            }
          }}
        />

        {/* Spinner Icon di dalam Input (Opsional) */}
        {(isLoading || isTyping) && (
          <div className="absolute right-3 top-3.5 text-gray-400">
            {/* Simple Pulse Dot */}
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A6AB2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3A6AB2]"></span>
            </span>
          </div>
        )}
      </div>

      {/* DROPDOWN MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 top-[85px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            <ul className="py-2">
              {/* STATE 1: TYPING (Gimmick Loading) */}
              {isTyping && (
                <li className="px-4 py-3 text-sm text-gray-500 italic flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  Waiting for you to finish typing...
                </li>
              )}

              {/* STATE 2: FETCHING API */}
              {!isTyping && isLoading && (
                <li className="px-4 py-3 text-sm text-[#3A6AB2] font-medium flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#3A6AB2] border-t-transparent rounded-full animate-spin"></div>
                  Searching for "{query}"...
                </li>
              )}

              {/* STATE 3: HAS RESULTS */}
              {!isTyping &&
                !isLoading &&
                results.length > 0 &&
                results.map((city) => (
                  <li
                    key={city.code}
                    onClick={() => handleSelect(city.name)}
                    className="px-4 py-2 hover:bg-[#3A6AB2] hover:text-white cursor-pointer transition-colors text-sm text-gray-700"
                  >
                    <div className="font-bold">{city.name}</div>
                    <div className="text-xs opacity-70">
                      {city.province.name}
                    </div>
                  </li>
                ))}

              {/* STATE 4: NO RESULTS (Tapi sudah selesai loading) */}
              {!isTyping &&
                !isLoading &&
                results.length === 0 &&
                query.length >= 3 && (
                  <li className="px-4 py-3 text-sm text-gray-500">
                    No city found. You can keep typing manually.
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
