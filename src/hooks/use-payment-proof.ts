import api from "@/lib/api";
import { ApiError } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useUploadPaymentProof = (onSuccess?: () => void) => {
  return useMutation<
    any, // Response type (sesuaikan jika ada type khusus)
    AxiosError<ApiError>,
    { participantId: string; file: File } // Argument mutation
  >({
    mutationFn: async ({ participantId, file }) => {
      // 1. Siapkan FormData
      const formData = new FormData();
      formData.append("payment_proof", file);

      // 2. Hit API
      const response = await api.post(
        `/api/v1/minicase/participants/${participantId}/payment-proof`,
        formData,
        {
          headers: { "Content-Type": undefined }, // Wajib undefined biar boundary otomatis
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Payment proof uploaded successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Upload Error:", error);
      toast.error(
        error.response?.data.error ?? "Failed to upload payment proof",
      );
    },
  });
};
