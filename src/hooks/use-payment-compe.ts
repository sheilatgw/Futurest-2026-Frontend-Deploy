import api from "@/lib/api";
import { ApiError } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useUploadPaymentCompetition = (onSuccess?: () => void) => {
  return useMutation<any, AxiosError<ApiError>, { teamId: string; file: File }>(
    {
      mutationFn: async ({ teamId, file }) => {
        const formData = new FormData();
        formData.append("payment_proof", file);

        const response = await api.post(
          `/api/v1/competition/teams/${teamId}/payment-proof`,
          formData,
          {
            headers: { "Content-Type": undefined },
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
    },
  );
};
