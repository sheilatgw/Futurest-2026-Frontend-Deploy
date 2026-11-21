import { api } from "@/lib/api";
import {
  ApiResponse,
  CompetitionTeam,
} from "@/types/page/team-detail-competition";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const competitionKeys = {
  all: ["competition"] as const,
  teams: () => [...competitionKeys.all, "teams"] as const,
  detail: (id: string) => [...competitionKeys.all, "detail", id] as const,
};

// get id
export const useGetCompetitionTeam = (teamId: string) => {
  return useQuery({
    queryKey: competitionKeys.detail(teamId),
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<CompetitionTeam>>(
        `/api/v1/competition/admin/teams/${teamId}`,
      );
      return data.data;
    },
    enabled: !!teamId,
  });
};

export const useUpdateCompetitionTeamStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      teamId,
      status,
      reason,
    }: {
      teamId: string;
      status: string;
      reason?: string;
    }) => {
      const payload: { status: string; rejected_reason?: string } = { status };
      if (reason) {
        payload.rejected_reason = reason;
      }
      const { data } = await api.put<ApiResponse<CompetitionTeam>>(
        `/api/v1/competition/admin/teams/${teamId}`,
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: competitionKeys.all });
      toast.success(data.message || "Team status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update team status",
      );
    },
  });
};
