"use client";

import { apiCoFetch } from "@/lib/api-co";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface UniversityData {
  id: string; // Tambahin ID
  name: string;
}

interface UniversitySearchInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function UniversitySearchInput({
  name,
  label,
  placeholder = "Ketik nama universitas...",
  required = false,
}: UniversitySearchInputProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const inputValue = watch(name);
  const [suggestions, setSuggestions] = useState<UniversityData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const error = errors[name]?.message as string | undefined;

  // Logic Debounce Search
  useEffect(() => {
    // Kalau user ngetik ulang (input berubah), kita reset ID universitasnya
    // karena berarti yang diketik belum tentu match sama ID yang lama
    // Kita cek dulu apakah inputnya sama dengan data terpilih, kalau beda reset ID.
    // (Simplifikasinya: setiap ngetik, anggap ID hilang dulu sampai dipilih ulang)
    // Tapi hati-hati infinite loop, jadi kita handle di onChange/handleSelect aja.

    const timer = setTimeout(async () => {
      if (inputValue && inputValue.length > 2 && showDropdown) {
        setIsLoading(true);
        try {
          // GANTI ENDPOINT: sesuaikan dengan API
          const data = await apiCoFetch<{ data: UniversityData[] }>(
            `/regional/indonesia/universities?name=${encodeURIComponent(
              inputValue,
            )}`,
            "",
          );
          setSuggestions(data?.data || []);
        } catch (_err) {
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, showDropdown]);

  const handleSelect = (univ: UniversityData) => {
    setValue(name, univ.name, { shouldValidate: true });
    setValue(`${name}_id`, univ.id); // SAVE ID KE HIDDEN FIELD (ex: university_id)
    setShowDropdown(false);
  };

  // Kalau user ngetik manual, pastikan ID dihapus biar component bawahnya tau ini manual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
    setValue(`${name}_id`, ""); // Reset ID jadi kosong
    setShowDropdown(true);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 relative" ref={wrapperRef}>
      <label className="block text-sm font-bold text-gray-800 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Hidden Input buat nyimpen ID */}
      <input type="hidden" {...register(`${name}_id`)} />

      <input
        {...register(name)}
        onChange={handleInputChange}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          "w-full px-4 py-2 border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "text-gray-700 placeholder-gray-400 transition-colors",
          error ? "border-red-500 focus:ring-red-500" : "",
        )}
      />

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 w-full bg-white mt-1 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-sm text-gray-500 text-center">
              Loading...
            </div>
          ) : (
            <ul>
              {suggestions.map((univ, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(univ)}
                  className="px-4 py-2 hover:bg-blue-500 cursor-pointer text-sm text-gray-700 hover:text-white font-titillium border-b border-gray-100 last:border-0"
                >
                  {univ.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
