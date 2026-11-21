import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type AbstractStatus = "ABSTRACT_APPROVED" | "ABSTRACT_REJECTED";

interface UpdateAbstractParams {
  participantId: string;
  status: AbstractStatus;
  reason?: string; // Reason wajib ada kalo statusnya REJECTED
}

export const useUpdateAbstractStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      participantId,
      status,
      reason,
    }: UpdateAbstractParams) => {
      // Logic Percabangan Endpoint
      if (status === "ABSTRACT_APPROVED") {
        // Endpoint Approve
        const response = await api.put(
          `/api/v1/minicase/admin/participants/${participantId}/abstract/approve`,
        );
        return response.data;
      } else {
        // Endpoint Reject (Wajib bawa reason)
        const response = await api.put(
          `/api/v1/minicase/admin/participants/${participantId}/abstract/reject`,
          { reason },
        );
        return response.data;
      }
    },
    onMutate: (variables) => {
      const action =
        variables.status === "ABSTRACT_APPROVED" ? "Approving" : "Rejecting";
      toast.loading(`${action} abstract...`, { id: "abstract-update" });
    },
    onSuccess: (_, variables) => {
      const action =
        variables.status === "ABSTRACT_APPROVED" ? "Approved" : "Rejected";
      toast.success(`Abstract ${action} successfully!`, {
        id: "abstract-update",
      });

      // Refresh Data UI
      queryClient.invalidateQueries({
        queryKey: ["future-talk-participant"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update status", {
        id: "abstract-update",
      });
    },
  });
};
