import { api } from "@/lib/api";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner"; // Assuming sonner is used for toasts based on package.json
import {
  ApiResponse,
  FutureTalkBatch,
  FutureTalkParticipant,
  FutureTalkSummary,
} from "./types";

// Keys
export const futureTalkKeys = {
  all: ["futureTalk"] as const,
  summary: () => [...futureTalkKeys.all, "summary"] as const,
  batches: () => [...futureTalkKeys.all, "batches"] as const,
  participants: (batchId?: string) =>
    [...futureTalkKeys.all, "participants", batchId] as const,
  detail: (id: string) => [...futureTalkKeys.all, "detail", id] as const,
};

// Hooks

export const useGetFutureTalkParticipant = (id: string) => {
  return useQuery({
    queryKey: futureTalkKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<FutureTalkParticipant>>(
        `/api/v1/minicase/admin/participants/${id}`,
      );
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetFutureTalkSummary = () => {
  return useQuery({
    queryKey: futureTalkKeys.summary(),
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<FutureTalkSummary>>(
        "/api/v1/minicase/admin/participants/summary",
      );
      return data.data;
    },
  });
};

export const useGetFutureTalkBatches = () => {
  return useQuery({
    queryKey: futureTalkKeys.batches(),
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<FutureTalkBatch[]>>(
        "/api/v1/minicase/batches",
      );
      return data.data;
    },
  });
};

export const useGetFutureTalkParticipants = (batchId?: string) => {
  return useQuery({
    queryKey: futureTalkKeys.participants(batchId),
    queryFn: async () => {
      if (!batchId) return [];
      const { data } = await api.get<ApiResponse<FutureTalkParticipant[]>>(
        `/api/v1/minicase/participants?batch_id=${batchId}`,
      );
      return data.data;
    },
    enabled: !!batchId,
  });
};

export const useGetAllFutureTalkParticipants = (
  batches?: FutureTalkBatch[],
) => {
  const results = useQueries({
    queries: (batches ?? []).map((batch) => ({
      queryKey: futureTalkKeys.participants(batch.id),
      queryFn: async () => {
        const { data } = await api.get<ApiResponse<FutureTalkParticipant[]>>(
          `/api/v1/minicase/admin/participants?batch_id=${batch.id}`,
        );
        return data.data;
      },
      enabled: !!batch.id,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const data = results.flatMap((r) => r.data || []);

  return { data, isLoading };
};

export const useApproveFutureTalkPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (participantId: string) => {
      const { data } = await api.put<ApiResponse<null>>(
        `/api/v1/minicase/admin/participants/${participantId}/payment/approve`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futureTalkKeys.all });
      toast.success("Payment approved successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to approve payment",
      );
    },
  });
};

export const useRejectFutureTalkPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (participantId: string) => {
      const { data } = await api.put<ApiResponse<null>>(
        `/api/v1/minicase/admin/participants/${participantId}/payment/reject`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: futureTalkKeys.all });
      toast.success("Payment rejected successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to reject payment");
    },
  });
};
