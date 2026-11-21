import { apiCoFetch } from "@/lib/api-co"; // Sesuaikan import
// src/hooks/use-institution-search.ts
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

// --- Types Original (TETAP) ---
interface University {
  name: string;
  province: string;
}

interface School {
  name: string;
  province_name: string;
  grade: string;
}

interface ApiCoResponse<T> {
  is_success: boolean;
  data: T[];
}

export interface InstitutionResult {
  label: string;
  subLabel: string;
}

type CacheData = Record<string, InstitutionResult[]>;

export function useInstitutionSearch(studentType: string | undefined) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<InstitutionResult[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const cache = useRef<CacheData>({});

  // 1. Logic Debounce (TETAP SAMA)
  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setIsOpen(true);

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  // 2. Logic Fetch API (LOGIC TETAP, ERROR HANDLING DIPERHALUS)
  useEffect(() => {
    const fetchInstitutions = async () => {
      if (!debouncedQuery || debouncedQuery.length < 3 || !studentType) {
        setResults([]);
        return;
      }

      const cacheKey = `${studentType}_${debouncedQuery.toLowerCase()}`;
      if (cache.current[cacheKey]) {
        setResults(cache.current[cacheKey]);
        return;
      }

      setIsLoading(true);

      // --- PERUBAHAN HANYA DI SINI ---
      // Try Catch TETAP ADA, tapi console.error DIHAPUS.
      try {
        // Panggil fetcher yang baru (param: type & query)
        // Kita cast 'any' biar logic bawahnya gaperlu diubah
        const res = await apiCoFetch<ApiCoResponse<any>>(
          studentType,
          debouncedQuery,
        );

        // Validasi: Kalau res null (fetch error) ATAU is_success false
        if (!res || !res.is_success) {
          // Langsung lempar ke catch atau handle toast disini

          throw new Error("Gagal mengambil data");
        }

        // --- LOGIC MAPPING ORIGINAL (GAK DIUBAH) ---
        const rawData = Array.isArray(res.data) ? res.data : [];
        let normalizedData: InstitutionResult[] = [];

        if (studentType === "UNIVERSITY") {
          normalizedData = (rawData as University[]).map((item) => ({
            label: item.name,
            subLabel: item.province,
          }));
        } else {
          normalizedData = (rawData as School[]).map((item) => ({
            label: item.name,
            subLabel: item.province_name,
          }));
        }

        const filtered = normalizedData.filter((item) =>
          item.label.toLowerCase().includes(debouncedQuery.toLowerCase()),
        );

        cache.current[cacheKey] = filtered;
        setResults(filtered);
      } catch (_error) {
        // --- CATCH BLOCK ---
        setResults([]);

        // JANGAN console.error
        // Cukup kasih Toast
        toast.error("Gagal mengambil data institusi, silakan coba lagi.", {
          id: "inst-fetch-error",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutions();
  }, [debouncedQuery, studentType]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isTyping,
    isOpen,
    setIsOpen,
    setResults,
  };
}
