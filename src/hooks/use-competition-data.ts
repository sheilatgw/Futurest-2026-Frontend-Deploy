import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { CompetitionTeam } from "@/types/page/competition";
import { useQuery } from "@tanstack/react-query";

export const useCompetitionData = (teamId: string | null) => {
  return useQuery({
    queryKey: ["competition-team", teamId],

    queryFn: async () => {
      if (!teamId) return null;

      const response = await api.get<ApiResponse<CompetitionTeam>>(
        `/api/v1/competition/teams/${teamId}`,
      );

      return response.data.data;
    },
    enabled: !!teamId,
    staleTime: 0,
    retry: (failureCount, error: any) => {
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};
