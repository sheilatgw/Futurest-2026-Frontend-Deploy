import api from "@/lib/api";
import { CompetitionBatch } from "@/types/page/regist-competition";
import { useQuery } from "@tanstack/react-query";

interface UseCompetitionBatchesParams {
  category?: string;
  is_active?: boolean;
}

export const useCompetitionBatches = (params?: UseCompetitionBatchesParams) => {
  return useQuery<CompetitionBatch[]>({
    queryKey: ["competition-batches", params],
    queryFn: async () => {
      const { category, is_active } = params || {};
      const queryParams = new URLSearchParams();
      if (category) queryParams.append("category", category);
      if (is_active !== undefined)
        queryParams.append("is_active", String(is_active));

      const res = await api.get(
        `/api/v1/competition/batches?${queryParams.toString()}`,
      );
      return res.data.data;
    },
  });
};
