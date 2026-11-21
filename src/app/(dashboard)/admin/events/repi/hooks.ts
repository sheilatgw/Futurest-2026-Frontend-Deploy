import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CompeTeamsResponse } from "@/types/dash-admin-compe";

// Query Keys
export const repiKeys = {
  all: ["repi"] as const,
  teams: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => [...repiKeys.all, "teams", params] as const,
};

// Hooks
export const useGetREPITeams = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: repiKeys.teams(params),
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      // queryParams.append("category", "REPI");
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("take", params.limit.toString());
      if (params?.status) queryParams.append("status", params.status);
      if (params?.search) queryParams.append("search", params.search);

      try {
        const { data } = await api.get<CompeTeamsResponse>(
          `/api/v1/competition/admin/teams?limit=1000&category=REPI&${queryParams.toString()}`,
        );

        // Return structure: { data: CompeTeam[], meta: Meta }
        return {
          data: data.data,
          meta: data.meta,
        };
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });
};
