import api from "@/lib/api";
import { ReiiTeamResponse } from "@/types/entity/reii";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const reiiKeys = {
  all: ["reii"] as const,
  detail: (id: string) => [...reiiKeys.all, "detail", id] as const,
};

export const useGetReiiTeam = (id: string) => {
  return useQuery({
    queryKey: reiiKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get<ReiiTeamResponse>(
        `/api/v1/competition/admin/teams/${id}`,
      );
      return data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateReiiTeamStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      rejected_reason,
    }: {
      id: string;
      status: string;
      rejected_reason?: string;
    }) => {
      return api.put(`/api/v1/competition/admin/teams/${id}`, {
        status,
        rejected_reason,
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: reiiKeys.detail(id) });
      toast.success("Team status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update team status",
      );
    },
  });
};
