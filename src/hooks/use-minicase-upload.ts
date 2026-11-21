import api from "@/lib/api";
import { ApiError } from "@/types/api"; // Pastikan type ini ada, atau ganti 'any'
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useMinicaseAbstract = (onSuccess?: () => void) => {
  return useMutation<
    any, // Response type
    AxiosError<ApiError>, // Error type
    { participantId: string; file: File } // Variables (Argument mutation)
  >({
    mutationFn: async ({ participantId, file }) => {
      // 1. Siapkan FormData
      const formData = new FormData();
      formData.append("study_case_abstract_file", file); // Sesuaikan key sama backend

      // 2. Hit API
      // Axios instance 'api' biasanya udah handle Base URL & Token otomatis
      const response = await api.post(
        `/api/v1/minicase/participants/${participantId}/abstract`, // Cek singular/plural di backend lu
        formData,
        {
          headers: { "Content-Type": undefined }, // Biar browser yang atur boundary
        },
      );
      return response.data;
    },
    onMutate: () => {
      // Opsional: Kalo mau loading toast muncul pas mulai upload
      toast.loading("Uploading abstract...", { id: "upload-abstract" });
    },
    onSuccess: () => {
      // Replace loading toast dengan success
      toast.success("Abstract uploaded successfully!", {
        id: "upload-abstract",
      });
      onSuccess?.(); // Trigger refetch data parent
    },
    onError: (error) => {
      // Replace loading toast dengan error
      toast.error(
        error.response?.data?.message ?? "Failed to upload abstract",
        { id: "upload-abstract" },
      );
    },
  });
};

export const useMinicaseProposal = (onSuccess?: () => void) => {
  return useMutation<
    any,
    AxiosError<ApiError>,
    { participantId: string; file: File }
  >({
    mutationFn: async ({ participantId, file }) => {
      const formData = new FormData();
      formData.append("proposal_file", file); // Key sesuai request

      const response = await api.post(
        `/api/v1/minicase/participants/${participantId}/proposal`, // Endpoint Proposal
        formData,
        {
          headers: { "Content-Type": undefined },
        },
      );
      return response.data;
    },
    onMutate: () => {
      toast.loading("Uploading proposal...", { id: "upload-proposal" });
    },
    onSuccess: () => {
      toast.success("Proposal submitted successfully!", {
        id: "upload-proposal",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "Failed to upload proposal",
        { id: "upload-proposal" },
      );
    },
  });
};
