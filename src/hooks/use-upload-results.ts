import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface UploadInterviewedVariables {
  id: string;
  data: unknown;
  accepted_division_id: string;
}

export function useUploadInterviewed() {
  const uploadInterviewed = async ({
    id,
    accepted_division_id,
  }: UploadInterviewedVariables) => {
    const url = `/api/v1/oprec-staff/interviewed/${id}?accepted_division_id=${accepted_division_id}`;
    const response = await api.put(url);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: uploadInterviewed,
  });

  return {
    ...mutation,
    uploadInterviewedData: mutation.mutateAsync,
  };
}
export function useBulkUploadAccepted() {
  const uploadInterviewed = async ({
    id,
    accepted_division_id,
  }: UploadInterviewedVariables) => {
    const url = `/api/v1/oprec-staff/accepted/${id}?accepted_division_id=${accepted_division_id}`;
    const response = await api.put(url);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: uploadInterviewed,
  });

  return {
    ...mutation,
    uploadInterviewedData: mutation.mutateAsync,
  };
}
