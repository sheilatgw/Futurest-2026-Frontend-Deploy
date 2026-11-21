import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";

function useInterviewed(id: string) {
  const { mutate: handleInterviewed, isPending } = useMutation<
    ApiResponse<null>,
    ApiError
  >({
    mutationKey: ["interviewed-" + id],
    mutationFn: async () => {
      const { data } = await api.put<ApiResponse<null>>(
        "/api/v1/oprec-staff/interviewed/" + id,
      );

      return data;
    },
    onSuccess: () => {
      toast.success(
        "Success continue registration process, Please refresh the page",
      );
      //   queryClient.refetchQueries({ stale: true });
    },
    onError: (err: ApiError) => {
      toast.error(err.message ?? "Something went wrong, please retry...");
    },
  });

  return { handleInterviewed, isPending };
}

export default useInterviewed;
