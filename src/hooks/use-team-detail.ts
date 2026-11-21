"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "LEADER" | "MEMBER";
  ktm: string;
  instagram_follow_futurest: string;
  instagram_follow_sre: string;
  twibbon_upload: string;
  poster_sharing_ig_story: string;
  poster_sharing_group: string;
  public_account_proof: string;
}

export interface TeamDetail {
  id: string;
  team_name: string;
  university: string;
  supervisor_name: string;
  supervisor_phone: string;
  status: string;
  competition_name: string;
  base_price: number;
  total_price: number;
  unique_code: number;
  members: TeamMember[];
}

interface TeamDetailResponse {
  success: boolean;
  message: string;
  data: TeamDetail;
}

export function useTeamDetail(teamId: string) {
  return useQuery<TeamDetail>({
    queryKey: ["team-detail", teamId],

    queryFn: async () => {
      if (!teamId) throw new Error("No team ID provided");

      const res = await api.get<TeamDetailResponse>(
        `/api/v1/competition/teams/${teamId}`,
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      return res.data.data;
    },

    enabled: !!teamId,
  });
}
