"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface CompetitionInfo {
  id: string;
  name: string;
  members: number;
  created_at: string;
  updated_at: string;
  DeletedAt: string | null;
}

export interface MyRegistration {
  id: string;
  user_id: string;
  competition_id: string;
  name: string;
  university: string;
  current_stage: string;
  last_stage: string;
  status: string;
  supervisor_name: string;
  supervisor_phone: string;
  base_price: number;
  unique_code: number;
  total_price: number;
  abstract: string | null;
  google_link_drive: string | null;
  rejected_reason: string | null;
  competition: CompetitionInfo;
  created_at: string;
  updated_at: string;
  DeletedAt: string | null;
}

interface MyRegistrationsResponse {
  success: boolean;
  message: string;
  data: MyRegistration[];
}

export function useMyRegistrations() {
  return useQuery<MyRegistration[]>({
    queryKey: ["my-registrations"],

    queryFn: async () => {
      const res = await api.get<MyRegistrationsResponse>(
        "/api/v1/competition/my-registrations",
      );

      const json = res.data;

      if (!json.success) {
        throw new Error(json.message || "Failed to fetch my registrations");
      }

      return json.data;
    },
  });
}
