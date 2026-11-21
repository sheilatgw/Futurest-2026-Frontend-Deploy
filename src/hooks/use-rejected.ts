import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";

function useRejectedInterview(id: string) {
  const queryClient = useQueryClient();
  const { mutate: handleRejected, isPending } = useMutation<
    ApiResponse<null>,
    ApiError
  >({
    mutationKey: ["rejected-" + id],
    mutationFn: async () => {
      const { data } = await api.put<ApiResponse<null>>(
        "/api/v1/oprec-staff/rejected/" + id,
      );

      return data;
    },
    onSuccess: () => {
      toast.success("Status berhasil diubah menjadi Rejected!");

      queryClient.invalidateQueries({ queryKey: ["detailRegistrant", id] });
    },
    onError: (err: ApiError) => {
      toast.error(err.message ?? "Something went wrong, please retry...");
    },
  });

  return { handleRejected, isPending };
}

export default useRejectedInterview;
