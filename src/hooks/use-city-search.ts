import { apiCoFetch } from "@/lib/api-co"; // Pastikan path import benar
// src/hooks/use-city-search.tsx
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Regency {
  code: string;
  name: string;
  province: {
    code: string;
    name: string;
  };
}

interface ApiCoResponse {
  is_success: boolean;
  data: Regency[];
}

type CacheData = Record<string, Regency[]>;

export function useCitySearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Regency[]>([]);

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

  // 2. Logic Fetch API (UPDATED)
  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedQuery || debouncedQuery.length < 3) {
        setResults([]);
        return;
      }

      const cacheKey = debouncedQuery.toLowerCase();

      if (cache.current[cacheKey]) {
        setResults(cache.current[cacheKey]);
        return;
      }

      setIsLoading(true);

      try {
        // --- PERUBAHAN DISINI ---
        // Panggil fetcher lokal dengan type "CITY"
        const res = await apiCoFetch<ApiCoResponse>("CITY", debouncedQuery);

        // Validasi: Kalau res null atau is_success false
        if (!res || !res.is_success) {
          throw new Error("Data tidak ditemukan");
        }

        // BUG FIX: Defensive Programming
        const sourceData = Array.isArray(res.data) ? res.data : [];

        // Filter lagi di client (kadang API search-nya luas)
        const filtered = sourceData.filter((item) =>
          item.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
        );

        cache.current[cacheKey] = filtered;
        setResults(filtered);
      } catch (_error) {
        setResults([]); // Set kosong biar UI ga crash

        toast.error("Gagal mengambil data kota, silakan ketik manual", {
          id: "city-fetch-error",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

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
