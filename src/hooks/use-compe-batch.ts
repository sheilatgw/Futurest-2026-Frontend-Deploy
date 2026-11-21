import api from "@/lib/api";
import { CompeBatch } from "@/types/page/compe-batch";
import { useQuery } from "@tanstack/react-query";

export const useCompeBatches = () => {
  return useQuery<CompeBatch[]>({
    queryKey: ["compe-batches"],
    queryFn: async () => {
      const res = await api.get("/api/v1/competition/batches");
      return res.data.data;
    },
  });
};
