import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  ApiResponse,
  REIIParticipant,
  REIISummary,
  REIIParticipantsData,
} from "./types";
import { CompeTeamsResponse } from "@/types/dash-admin-compe";

// ambil summary peserta reii
export const useGetREIISummary = () => {
  return useQuery({
    queryKey: ["reii-summary"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<REIIParticipant[]>>(
        "/api/v1/competition/admin/teams",
        { params: { limit: 1000 } },
      );

      const allData = response.data.data || [];
      const reiiOnly = allData.filter(
        (item) => item.competition_name === "REII",
      );

      const verified = reiiOnly.filter(
        (t) => t.status === "PAYMENT_APPROVED" || t.status === "APPROVED",
      );
      const pending = reiiOnly.filter(
        (t) =>
          t.status === "PAYMENT_VERIFICATION" || t.status === "PENDING_PAYMENT",
      );
      const rejected = reiiOnly.filter(
        (t) => t.status === "PAYMENT_REJECTED" || t.status === "REJECTED",
      );

      return {
        total_participants: reiiOnly.length,
        verified_participants: verified.length,
        pending_participants: pending.length,
        rejected_participants: rejected.length,
        by_status: [
          {
            status: "PAYMENT_APPROVED",
            count: reiiOnly.filter((t) => t.status === "PAYMENT_APPROVED")
              .length,
          },
          {
            status: "APPROVED",
            count: reiiOnly.filter((t) => t.status === "APPROVED").length,
          },
          {
            status: "PAYMENT_VERIFICATION",
            count: reiiOnly.filter((t) => t.status === "PAYMENT_VERIFICATION")
              .length,
          },
          {
            status: "PENDING_PAYMENT",
            count: reiiOnly.filter((t) => t.status === "PENDING_PAYMENT")
              .length,
          },
          {
            status: "PAYMENT_REJECTED",
            count: reiiOnly.filter((t) => t.status === "PAYMENT_REJECTED")
              .length,
          },
          {
            status: "REJECTED",
            count: reiiOnly.filter((t) => t.status === "REJECTED").length,
          },
        ],
        total_revenue: 0,
      } as REIISummary;
    },
  });
};

// ambil data peserta reii, bisa filter & pagination manual
export const useGetREIIParticipants = (params: {
  page?: number;
  take?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["reii-participants", params],
    queryFn: async () => {
      // ambil semua data
      const response = await api.get<ApiResponse<REIIParticipant[]>>(
        "/api/v1/competition/admin/teams",
        {
          params: {
            limit: 1000, // ambil banyak data sekaligus, nanti di filter & paginate manual
            search: params.search || undefined,
            // status jangan dikirim ke api, filter di frontend aja
          },
        },
      );

      const allData = response.data.data || [];

      // filter khusus reii
      let filtered = allData.filter((item) => item.competition_name === "REII");

      // filter status di frontend
      if (params.status && params.status !== "all") {
        filtered = filtered.filter((item) => item.status === params.status);
      }

      // mapping data leader
      const mappedData = filtered.map((team) => {
        const leader = team.members?.find((m) => m.type === "LEADER");
        return {
          ...team,
          team_leader_name: leader?.name || "-",
          team_leader_email: leader?.email || "-",
          team_leader_phone: leader?.phone || "-",
        };
      });

      // pagination manual
      const page = params.page || 1;
      const take = params.take || 10;
      const totalREII = mappedData.length;
      const paginatedData = mappedData.slice((page - 1) * take, page * take);

      return {
        competition: paginatedData,
        meta: {
          page: page,
          limit: take,
          total: totalREII,
          total_pages: Math.ceil(totalREII / take) || 1,
        },
      } as REIIParticipantsData;
    },
  });
};

export const useGetREIITeams = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["reii-teams", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      // queryParams.append("category", "REII");
      if (params?.page) queryParams.append("page", params.page.toString());
      // if (params?.limit) queryParams.append("take", params.limit.toString());
      if (params?.status) queryParams.append("status", params.status);
      if (params?.search) queryParams.append("search", params.search);

      try {
        const { data } = await api.get<CompeTeamsResponse>(
          `/api/v1/competition/admin/teams?limit=1000&category=REII&${queryParams.toString()}`,
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

// ambil semua peserta reii, tanpa filter & pagination (buat export)
export const useGetAllREIIParticipantsRaw = () => {
  return useQuery({
    queryKey: ["reii-participants-all-raw"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<REIIParticipant[]>>(
        "/api/v1/competition/admin/teams",
        { params: { limit: 1000 } },
      );
      const allData = response.data.data || [];
      // filter reii aja, gausah di slice
      return allData.filter((item) => item.competition_name === "REII");
    },
  });
};
