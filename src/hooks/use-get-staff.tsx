import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface DivisionData {
  id: string;
  subdivision: string;
  count: number;
}

export interface DashboardData {
  id: string;
  title: string;
  count: number;
  subdivision: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: DivisionData[];
}

export function useDivisionCount() {
  const fetchDivisionCount = async (): Promise<DashboardData[]> => {
    const { data } = await api.get<ApiResponse>(
      "/api/v1/oprec-staff/count/subdivision",
    );
    return data.data.map((item) => ({
      id: item.id,
      title: item.subdivision,
      count: item.count,
      subdivision: item.subdivision,
    }));
  };

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["division-count"],
    queryFn: fetchDivisionCount,
  });

  return {
    data: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
