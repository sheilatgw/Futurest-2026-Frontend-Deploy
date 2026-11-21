import api from "@/lib/api";
import { FutureTalkBatch } from "@/types/page/futuretalk-batch";
import { useQuery } from "@tanstack/react-query";

export const useMinicaseBatches = () => {
  return useQuery<FutureTalkBatch[]>({
    queryKey: ["futuretalk-batches"],
    queryFn: async () => {
      const res = await api.get("/api/v1/minicase/batches");
      return res.data.data;
    },
  });
};
