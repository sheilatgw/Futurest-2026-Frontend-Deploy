import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";

function useAcceptedIterview(id: string, divisionID: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: handleAccepted, isPending } = useMutation<
    ApiResponse<null>,
    ApiError
  >({
    mutationKey: ["accepted-" + id],
    mutationFn: async () => {
      const { data } = await api.put<ApiResponse<null>>(
        `/api/v1/oprec-staff/accepted/${id}?accepted_division_id=${divisionID}`,
      );

      return data;
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Status berhasil diubah menjadi accepted!");
      // Auto invalidate dan re-render tanpa refresh
      queryClient.invalidateQueries({
        queryKey: ["detailRegistrant", id],
      });
    },
    onError: (err: ApiError) => {
      toast.dismiss();
      toast.error(err.message ?? "Gagal mengubah status, silakan coba lagi...");
    },
  });

  return { handleAccepted, isPending };
}

export default useAcceptedIterview;
