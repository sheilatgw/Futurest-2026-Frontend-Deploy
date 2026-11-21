import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface EventData {
  category: string;
  count: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: EventData[];
}

export function useEventCount() {
  const fetchEventCount = async (): Promise<EventData[]> => {
    const { data } = await api.get<ApiResponse>(
      "/api/v1/competition/admin/count/category",
    );
    return data.data.map((item) => ({
      category: item.category,
      count: item.count,
    }));
  };

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["events-count"],
    queryFn: fetchEventCount,
  });

  return {
    data: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
