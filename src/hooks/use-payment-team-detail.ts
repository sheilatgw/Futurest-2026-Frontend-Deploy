"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface TeamPayment {
  id: string;
  status: string;
  payment_proof: string | null;
  amount: number;
}

interface TeamPaymentResponse {
  success: boolean;
  message: string;
  data: TeamPayment;
}

export function useTeamPayment(teamId: string) {
  return useQuery<TeamPayment>({
    queryKey: ["team-payment", teamId],

    queryFn: async () => {
      const res = await api.get<TeamPaymentResponse>(
        `/api/v1/competition/teams/${teamId}/payment`,
      );

      const json = res.data;

      if (!json.success) {
        throw new Error(json.message || "Failed to fetch team payment");
      }

      return json.data;
    },

    enabled: !!teamId,
  });
}
