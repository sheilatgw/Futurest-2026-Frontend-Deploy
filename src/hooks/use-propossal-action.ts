import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type ProposalStatus = "PROPOSAL_APPROVED" | "PROPOSAL_REJECTED";

interface UpdateProposalParams {
  participantId: string;
  status: ProposalStatus;
  reason?: string; // Reason wajib ada kalo statusnya REJECTED
}

export const useUpdateProposalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      participantId,
      status,
      reason,
    }: UpdateProposalParams) => {
      // Logic Percabangan Endpoint
      if (status === "PROPOSAL_APPROVED") {
        // Endpoint Approve
        const response = await api.put(
          `/api/v1/minicase/admin/participants/${participantId}/proposal/approve`,
        );
        return response.data;
      } else {
        // Endpoint Reject (Wajib bawa reason)
        const response = await api.put(
          `/api/v1/minicase/admin/participants/${participantId}/proposal/reject`,
          { reason },
        );
        return response.data;
      }
    },
    onMutate: (variables) => {
      const action =
        variables.status === "PROPOSAL_APPROVED" ? "Approving" : "Rejecting";
      toast.loading(`${action} proposal...`, { id: "proposal-update" });
    },
    onSuccess: (_, variables) => {
      const action =
        variables.status === "PROPOSAL_APPROVED" ? "Approved" : "Rejected";
      toast.success(`Proposal ${action} successfully!`, {
        id: "proposal-update",
      });

      // Refresh Data UI
      queryClient.invalidateQueries({
        queryKey: ["future-talk-participant"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update status", {
        id: "proposal-update",
      });
    },
  });
};
