import api from "@/lib/api";
import { ApiResponse } from "@/types/api"; // Pastikan path type ini sesuai projectmu
import { MinicaseParticipant } from "@/types/page/regist-minicase"; // Pastikan path type ini sesuai projectmu
import { useQuery } from "@tanstack/react-query";

export const useMinicaseData = (participantId: string | null) => {
  return useQuery({
    // Key unik untuk cache, berubah kalau participantId berubah
    queryKey: ["minicase-participant", participantId],

    // Fungsi fetch data ke API
    queryFn: async () => {
      if (!participantId) return null;

      const response = await api.get<ApiResponse<MinicaseParticipant>>(
        `/api/v1/minicase/participants/${participantId}`,
      );

      return response.data.data;
    },

    // Query hanya jalan jika participantId ADA (tidak null/undefined/string kosong)
    enabled: !!participantId,

    // Opsional: Agar data selalu dianggap 'basi' dan fetch ulang saat komponen mount (bagus untuk cek status bayar)
    staleTime: 0,

    // Opsional: Jangan retry kalau error 404
    retry: (failureCount, error: any) => {
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};
