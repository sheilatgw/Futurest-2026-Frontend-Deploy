import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { CompetitionRegistration } from "@/types/page/competition";
import { useQuery } from "@tanstack/react-query";

export const useCompetitionRegistrations = () => {
  return useQuery({
    queryKey: ["competition-registrations"],

    queryFn: async () => {
      const response = await api.get<ApiResponse<CompetitionRegistration[]>>(
        `/api/v1/competition/my-registrations`,
      );

      return response.data.data;
    },

    staleTime: 0,

    retry: (failureCount, error: any) => {
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};

// Hook khusus untuk mendapatkan team ID berdasarkan competition name
export const useCompetitionTeamId = (competitionName: string) => {
  return useQuery({
    queryKey: ["competition-team-id", competitionName],

    queryFn: async () => {
      const response = await api.get<ApiResponse<CompetitionRegistration[]>>(
        `/api/v1/competition/my-registrations`,
      );

      const registrations = response.data.data;

      // Filter berdasarkan competition name
      const targetRegistration = registrations.find(
        (reg) => reg.competition?.name === competitionName,
      );

      // Return team ID (id paling atas, bukan competition.id)
      return targetRegistration?.id || null;
    },

    staleTime: 0,

    retry: (failureCount, error: any) => {
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};
