"use client";

import { apiCoFetch } from "@/lib/api-co";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface OptionData {
  id: string;
  name: string; // Sesuaikan dengan response API (biasanya 'name')
}

interface DependentSearchInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  parentName: string;
  endpointPath: string; // Path API, misal: /regional/indonesia/universities/{id}/faculties
}

export default function DependentSearchInput({
  name,
  label,
  placeholder,
  required = false,
  parentName,
  endpointPath,
}: DependentSearchInputProps) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  // Watch field Bapak-nya
  const parentValue = useWatch({ control, name: parentName });
  const parentId = useWatch({ control, name: `${parentName}_id` }); // ID Bapak

  // Watch input sendiri buat filtering
  const inputValue = useWatch({ control, name: name });

  // State
  const [allOptions, setAllOptions] = useState<OptionData[]>([]); // Nyimpen SEMUA data
  const [filteredOptions, setFilteredOptions] = useState<OptionData[]>([]); // Data yang tampil (hasil filter)
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const error = errors[name]?.message as string | undefined;

  // Logic Disabled: Kalau Bapaknya kosong
  const isDisabled = !parentValue || parentValue === "";

  // Logic Mode: Kalau Bapaknya punya ID -> API Mode. Kalau nggak -> Manual Mode.
  const isApiMode = !!parentId && parentId !== "";

  // 1. FETCH DATA (Jalan setiap Parent ID berubah)
  useEffect(() => {
    // Kalau ID Bapak ganti, kita reset data & fetch ulang
    if (isApiMode) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          // Replace {id} dengan ID Bapak
          const path = endpointPath.replace("{id}", parentId);
          // Kita asumsi endpoint ini balikin LIST SEMUA (tanpa search query)
          const res = await apiCoFetch<{ data: OptionData[] }>(path, "");

          const data = res?.data || [];
          setAllOptions(data);
          setFilteredOptions(data); // Awalnya tampilkan semua
        } catch (err) {
          console.error(`Gagal fetch ${name}`, err);
          setAllOptions([]);
          setFilteredOptions([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      // Kalau bukan mode API atau disabled, kosongin data
      setAllOptions([]);
      setFilteredOptions([]);
    }
  }, [isApiMode, parentId, endpointPath, name]);

  // 2. FILTERING LOGIC (Jalan setiap user ngetik)
  useEffect(() => {
    if (!inputValue) {
      // Kalau input kosong, tampilkan semua opsi yang udah di-fetch
      setFilteredOptions(allOptions);
      return;
    }

    // Filter lokal (case insensitive)
    const lowerInput = inputValue.toLowerCase();
    const filtered = allOptions.filter((opt) =>
      opt.name.toLowerCase().includes(lowerInput),
    );
    setFilteredOptions(filtered);
  }, [inputValue, allOptions]);

  // 3. HANDLE SELECT
  const handleSelect = (item: OptionData) => {
    setValue(name, item.name, { shouldValidate: true });
    setValue(`${name}_id`, item.id); // Simpan ID buat anak selanjutnya
    setShowDropdown(false);
  };

  // 4. HANDLE RESET (Kalau bapaknya dihapus user)
  useEffect(() => {
    if (isDisabled) {
      setValue(name, "");
      setValue(`${name}_id`, "");
    }
  }, [isDisabled, setValue, name]);

  // Handle click outside
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

      {/* Hidden ID */}
      <input type="hidden" {...register(`${name}_id`)} />

      <input
        {...register(name)}
        type="text"
        placeholder={isDisabled ? `Isi ${parentName} dulu` : placeholder}
        disabled={isDisabled}
        autoComplete="off"
        // Pas diklik/focus, langsung buka dropdown biar user liat semua opsi
        onFocus={() => isApiMode && setShowDropdown(true)}
        className={cn(
          "w-full px-4 py-2 border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "text-gray-700 placeholder-gray-400 transition-colors",
          isDisabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : "",
          error ? "border-red-500 focus:ring-red-500" : "",
        )}
      />

      {/* Dropdown */}
      {showDropdown && isApiMode && !isDisabled && (
        <div className="absolute z-50 w-full bg-white mt-1 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-sm text-gray-500 text-center">
              Loading data...
            </div>
          ) : filteredOptions.length > 0 ? (
            <ul>
              {filteredOptions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-0"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-sm text-gray-400 text-center italic">
              {/* Kalau kosong, berarti gak match filter atau emang datanya kosong */}
              {allOptions.length > 0
                ? "Tidak ditemukan. Lanjutkan ketik manual."
                : "Data belum tersedia, silakan ketik manual."}
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
