import api from "@/lib/api";
import { ApiError } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useCompetitionAbstract = (onSuccess?: () => void) => {
  return useMutation<any, AxiosError<ApiError>, { teamId: string; file: File }>(
    {
      mutationFn: async ({ teamId, file }) => {
        const formData = new FormData();
        formData.append("abstract", file);

        const response = await api.post(
          `/api/v1/competition/teams/${teamId}/abstract`,
          formData,
          {
            headers: { "Content-Type": undefined },
          },
        );
        return response.data;
      },
      onMutate: () => {
        toast.loading("Uploading abstract...", { id: "upload-abstract" });
      },
      onSuccess: () => {
        toast.success("Abstract uploaded successfully!", {
          id: "upload-abstract",
        });
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ?? "Failed to upload abstract",
          { id: "upload-abstract" },
        );
      },
    },
  );
};

export const useCompetitionPaymentProof = (onSuccess?: () => void) => {
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
      onMutate: () => {
        toast.loading("Uploading payment proof...", { id: "upload-payment" });
      },
      onSuccess: () => {
        toast.success("Payment proof uploaded successfully!", {
          id: "upload-payment",
        });
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ?? "Failed to upload payment proof",
          { id: "upload-payment" },
        );
      },
    },
  );
};
