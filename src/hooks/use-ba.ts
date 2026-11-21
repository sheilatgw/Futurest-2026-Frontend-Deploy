import api from "@/lib/api";
import { verifyEmailDelivery } from "@/lib/email-verifier";
import { ApiResponse } from "@/types/api";
import {
  BaApplicant,
  BaApplicantListResponse,
  BaApplicantResponse,
} from "@/types/entity/ba";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const brandAmbassadorKeys = {
  all: ["brandAmbassador"] as const,
  summary: () => [...brandAmbassadorKeys.all, "summary"] as const,
  participants: (batchId?: string) =>
    [...brandAmbassadorKeys.all, "participants", batchId] as const,
  detail: (id: string) => [...brandAmbassadorKeys.all, "detail", id] as const,
};

export function useBaApplicants() {
  const fetchBaApplicants = async (): Promise<BaApplicant[]> => {
    // Assuming /api/v1/ba returns the list.
    const { data } = await api.get<BaApplicantListResponse>(
      "/api/admin/ba/applications?limit=10000",
    );
    return data.data.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["ba-applicants"],
    queryFn: fetchBaApplicants,
  });

  return {
    data: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}

export const useGetBrandAmbassadorParticipant = (id: string) => {
  return useQuery({
    queryKey: brandAmbassadorKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get<BaApplicantResponse>(
        `/api/admin/ba/applications/${id}`,
      );
      return data.data;
    },
    enabled: !!id,
  });
};
// --- HOOK APPROVE ---
export const useApproveBrandAmbassador = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Update param: Kita butuh email & name buat kirim notif
    mutationFn: async ({
      participantId,
      email,
      name,
    }: {
      participantId: string;
      email: string;
      name: string;
    }) => {
      // 1. APPROVE DI DATABASE (Backend Utama)
      const { data } = await api.post<ApiResponse<null>>(
        `/api/admin/ba/applications/${participantId}/accept`,
      );

      // 2. KIRIM EMAIL (Next.js API)
      // Kita bungkus try-catch khusus email biar kalau DB sukses tapi email gagal,
      // kita bisa handle spesifik errornya (opsional)
      const toastId = toast.loading("Mengirim email notifikasi...");
      try {
        const emailRes = await fetch("/api/send-email/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: participantId,
            email,
            name,
            isAccepted: true,
          }),
        });

        // Handle Error Server Email (Misal 500)
        if (!emailRes.ok) {
          toast.error("Email tidak terkirim: Gangguan Server", { id: toastId });
          // Kita throw error biar mutation statusnya jadi 'error'
          throw new Error("Gagal kirim email");
        }

        // STEP 3: Verifikasi Bounce (UPDATE TOAST JADI LOADING LAGI)
        toast.loading("Memverifikasi status pengiriman (tunggu 4s)...", {
          id: toastId,
        });

        const deliveryStatus = await verifyEmailDelivery(email);

        // STEP 4: Final Result
        if (deliveryStatus === "BOUNCED") {
          // Kasus Email Mental
          toast.error(
            "Email gagal terkirim (Bounced). Silakan kirim ulang / kontak manual.",
            {
              id: toastId,
              duration: 5000,
            },
          );
          throw new Error("Email bounced");
        } else {
          // Kasus Sukses Total
          toast.success("Sukses! Peserta diterima & Email terkirim.", {
            id: toastId,
          });
        }
      } catch (error: any) {
        // Catch error network / fetch
        // Cek kalo toastnya belum di-update jadi error (misal error koneksi internet)
        if (
          error.message !== "Email bounced" &&
          error.message !== "Gagal kirim email"
        ) {
          toast.error("Gagal koneksi ke server email.", { id: toastId });
        }
        throw error; // Lempar biar onError jalan
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandAmbassadorKeys.all });
      toast.success("Peserta diterima & Email terkirim aman!");
    },
    onError: (error: any) => {
      // Error handling lebih detail
      const msg =
        error?.response?.data?.message || error.message || "Failed to approve";
      toast.error(msg);
    },
  });
};
export const useRejectBrandAmbassador = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      participantId,
      reason,
      email,
      name,
    }: {
      participantId: string;
      reason: string;
      email: string;
      name: string;
    }) => {
      // 1. REJECT DI DATABASE
      // (Proses ini cepat, update DB dulu)
      const { data } = await api.post<ApiResponse<null>>(
        `/api/admin/ba/applications/${participantId}/reject`,
        { reason },
      );

      // 2. KIRIM EMAIL (Mulai Tampilkan Toast Loading)
      const toastId = toast.loading("Mengirim email penolakan...");

      try {
        const emailRes = await fetch("/api/send-email/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: participantId,
            email,
            name,
            isAccepted: false, // Status Rejected
          }),
        });

        // Handle Error Server Email
        if (!emailRes.ok) {
          toast.error("Email tidak terkirim: Gangguan Server", { id: toastId });
          throw new Error("Gagal kirim email");
        }

        // 3. VERIFIKASI BOUNCE (Update Toast Loading)
        toast.loading("Memverifikasi status pengiriman (tunggu 4s)...", {
          id: toastId,
        });

        const deliveryStatus = await verifyEmailDelivery(email);

        // 4. FINAL RESULT
        if (deliveryStatus === "BOUNCED") {
          // Kasus Email Mental
          toast.error(
            "Email gagal terkirim (Bounced). Silakan kontak manual.",
            {
              id: toastId,
              duration: 5000,
            },
          );
          throw new Error("Email bounced");
        } else {
          // Kasus Sukses
          toast.success("Sukses! Peserta ditolak & notifikasi terkirim.", {
            id: toastId,
          });
        }
      } catch (error: any) {
        // Handle Error Network/Lainnya selain yg sudah dihandle diatas
        if (
          error.message !== "Email bounced" &&
          error.message !== "Gagal kirim email"
        ) {
          toast.error("Gagal koneksi ke server email.", { id: toastId });
        }
        throw error; // Lempar biar onError jalan
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandAmbassadorKeys.all });
      // Toast sukses sudah dihandle di mutationFn step 4
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui status peserta");
      // Toast error juga sudah dihandle di mutationFn
      // Kecuali error dari API DB (step 1), itu akan muncul toast default kalau mau ditambahkan logicnya
    },
  });
};
interface ScheduleInterviewPayload {
  interview_date: string;
  interview_method: string;
  interview_link: string;
  notes: string;
}

export function useScheduleInterview(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ScheduleInterviewPayload) =>
      api.post(`/api/admin/ba/applications/${id}/schedule-interview`, payload),

    onSuccess: (_, variables) => {
      // ← Langkah 1: Optimistic update di sini
      queryClient.setQueryData(
        ["brand-ambassador-participant", id], // harus sama persis dengan queryKey di useGetBrandAmbassadorParticipant
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            interview_schedule: variables.interview_date, // format yang sudah +07:00
            interview_method: variables.interview_method,
            interview_link: variables.interview_link,
            interview_notes: variables.notes,
            // Jika status participant berubah (misal jadi INTERVIEW), tambahkan juga:
            // status: 'INTERVIEW',
          };
        },
      );

      // Tetap invalidate supaya data tetap sync dengan server (refetch background)
      queryClient.invalidateQueries({
        queryKey: ["brand-ambassador-participant", id],
      });
    },

    // Optional: handle error jika perlu rollback
    onError: (_err, _variables, _context) => {
      // Bisa rollback cache jika perlu, tapi biasanya cukup invalidate saja
      queryClient.invalidateQueries({
        queryKey: ["brand-ambassador-participant", id],
      });
    },
  });
}

export function useUpdateParticipantStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStatus: string) =>
      api.put(`/api/admin/ba/applications/${id}/status`, { status: newStatus }),

    onSuccess: () => {
      // Invalidate list & detail supaya data refresh
      queryClient.invalidateQueries({ queryKey: ["ba-applicants"] });
      queryClient.invalidateQueries({
        queryKey: ["brand-ambassador-participant", id],
      });
    },

    onError: (error) => {
      console.error("Gagal update status:", error);
      // Optional: tampilkan toast error
    },
  });
}
