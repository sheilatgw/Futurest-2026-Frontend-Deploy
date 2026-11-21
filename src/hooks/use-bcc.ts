import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { serialize } from "object-to-formdata";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  clearFormFromLocalStorage,
  loadFormFromLocalStorage,
  saveFormToLocalStorage,
} from "@/lib/form-persist";
import { ApiError, ApiResponse } from "@/types/api";
import { BCCSchema } from "@/validation/bcc-schema";
import { CompeTeamsResponse } from "@/types/dash-admin-compe";

const STORAGE_KEY = "bcc_registration_form";

const useBCC = (
  user?: { personal_info?: { email?: string; phone_number?: string } },
  onSuccessCallback?: () => void,
) => {
  const hydratedRef = useRef(false);

  const form = useForm<z.infer<typeof BCCSchema>>({
    mode: "onChange",
    resolver: zodResolver(BCCSchema),
    defaultValues: {
      competition_batch_id: "BCC_2026", // TODO: Get from somewhere
      team_name: "",
      university: "",
      supervisor_name: "",
      supervisor_phone: "",
      google_drive_link: "",
      link_public_check: false as unknown as true,
      // payment_proof: undefined,

      leader: {
        name: "",
        email: "",
        phone: "",
      },
      leader_ktm: undefined,
      leader_payment_proof: undefined,
      leader_instagram_follow_futurest: undefined,
      leader_instagram_follow_sre: undefined,
      leader_twibbon_upload: undefined,
      leader_ig_story: undefined,
      leader_poster_sharing: undefined,
      leader_friend_mentions: undefined,
      leader_public_account_proof: undefined,

      member_0: {
        name: "",
        email: "",
        phone: "",
      },
      member_0_ktm: undefined,
      member_0_instagram_follow_futurest: undefined,
      member_0_instagram_follow_sre: undefined,
      member_0_twibbon_upload: undefined,
      member_0_ig_story: undefined,
      member_0_poster_sharing: undefined,
      member_0_friend_mentions: undefined,
      member_0_public_account_proof: undefined,

      member_1: {
        name: "",
        email: "",
        phone: "",
      },
      member_1_ktm: undefined,
      member_1_instagram_follow_futurest: undefined,
      member_1_instagram_follow_sre: undefined,
      member_1_twibbon_upload: undefined,
      member_1_ig_story: undefined,
      member_1_poster_sharing: undefined,
      member_1_friend_mentions: undefined,
      member_1_public_account_proof: undefined,
    },
  });

  useEffect(() => {
    const saved = loadFormFromLocalStorage(STORAGE_KEY);
    if (saved) {
      form.reset(saved);
    }
    hydratedRef.current = true;
  }, [form]);

  useEffect(() => {
    if (!user?.personal_info?.email) return;

    form.setValue("leader.email", user.personal_info.email, {
      shouldDirty: false,
      shouldValidate: true,
    });

    const currentPhone = form.getValues("leader.phone");
    if (!currentPhone && user.personal_info.phone_number) {
      let formattedPhone = user.personal_info.phone_number;
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "62" + formattedPhone.slice(1);
      }

      form.setValue("leader.phone", formattedPhone, {
        shouldDirty: false,
        shouldValidate: true,
      });
    }
  }, [user, form]);

  useEffect(() => {
    const sub = form.watch((value) => {
      if (!hydratedRef.current) return;
      saveFormToLocalStorage(STORAGE_KEY, value);
    });
    return () => sub.unsubscribe();
  }, [form]);

  function onSubmit(data: z.infer<typeof BCCSchema>) {
    try {
      const cleanedData = {
        competition_batch_id: "b8733149-a4d6-47c7-87e0-a10a9f62f574",
        team_name: data.team_name,
        university: data.university,
        supervisor_name: data.supervisor_name,
        supervisor_phone: data.supervisor_phone,
        google_drive_link: data.google_drive_link,
        link_public_check: data.link_public_check,

        // payment_proof: data.payment_proof,

        // Leader info
        "leader[name]": data.leader.name,
        "leader[email]": data.leader.email,
        "leader[phone]": data.leader.phone,

        // Leader files
        leader_ktm: data.leader_ktm,
        leader_payment_proof: data.leader_payment_proof,
        leader_instagram_follow_futurest: data.leader_instagram_follow_futurest,
        leader_instagram_follow_sre: data.leader_instagram_follow_sre,
        leader_twibbon_upload: data.leader_twibbon_upload,
        leader_ig_story: data.leader_ig_story,
        leader_poster_sharing: data.leader_poster_sharing,
        leader_friend_mentions: data.leader_friend_mentions,
        leader_public_account_proof: data.leader_public_account_proof,

        // Member 0 info
        "member_0[name]": data.member_0.name,
        "member_0[email]": data.member_0.email,
        "member_0[phone]": data.member_0.phone,

        // Member 0 files
        member_0_ktm: data.member_0_ktm,
        member_0_instagram_follow_futurest:
          data.member_0_instagram_follow_futurest,
        member_0_instagram_follow_sre: data.member_0_instagram_follow_sre,
        member_0_twibbon_upload: data.member_0_twibbon_upload,
        member_0_ig_story: data.member_0_ig_story,
        member_0_poster_sharing: data.member_0_poster_sharing,
        member_0_friend_mentions: data.member_0_friend_mentions,
        member_0_public_account_proof: data.member_0_public_account_proof,

        // Member 1 info
        "member_1[name]": data.member_1.name,
        "member_1[email]": data.member_1.email,
        "member_1[phone]": data.member_1.phone,

        // Member 1 files
        member_1_ktm: data.member_1_ktm,
        member_1_instagram_follow_futurest:
          data.member_1_instagram_follow_futurest,
        member_1_instagram_follow_sre: data.member_1_instagram_follow_sre,
        member_1_twibbon_upload: data.member_1_twibbon_upload,
        member_1_ig_story: data.member_1_ig_story,
        member_1_poster_sharing: data.member_1_poster_sharing,
        member_1_friend_mentions: data.member_1_friend_mentions,
        member_1_public_account_proof: data.member_1_public_account_proof,
      };

      const formData = serialize(cleanedData, {
        indices: false,
        nullsAsUndefineds: true,
      });

      handleRegister(formData);
    } catch (_error) {
      toast.error("Error preparing submission data");
    }
  }

  const {
    mutate: handleRegister,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useMutation<
    AxiosResponse<ApiResponse<any>>,
    AxiosError<ApiError>,
    FormData
  >({
    mutationFn: (formData) =>
      api.post("/api/v1/competition/register", formData, {
        headers: { "Content-Type": undefined },
      }),

    onSuccess: (_response) => {
      toast.success("Registration successful!");
      clearFormFromLocalStorage(STORAGE_KEY);
      onSuccessCallback?.();
    },

    onError: (error) => {
      const msg =
        error.response?.data.error || "Submission failed, please try again.";
      toast.error(msg);
    },
  });

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
    isError,
    reset,
  };
};

export default useBCC;

export const BCC_STATUS = {
  PENDING_PAYMENT: "PENDING_PAYMENT",
  PAYMENT_VERIFICATION: "PAYMENT_VERIFICATION",
  PAYMENT_REJECTED: "PAYMENT_REJECTED",
  ABSTRACT_VERIFICATION: "ABSTRACT_VERIFICATION",
  ABSTRACT_REJECTED: "ABSTRACT_REJECTED",
  ABSTRACT_APPROVED: "ABSTRACT_APPROVED",
  PROPOSAL_VERIFICATION: "PROPOSAL_VERIFICATION",
  PROPOSAL_REJECTED: "PROPOSAL_REJECTED",
  PROPOSAL_APPROVED: "PROPOSAL_APPROVED",
} as const;

export const bccKeys = {
  all: ["bcc"] as const,
  teams: () => [...bccKeys.all, "teams"] as const,
  detail: (id: string) => [...bccKeys.all, "detail", id] as const,
};

export const useGetBCCTeam = (id: string) => {
  return useQuery({
    queryKey: bccKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<CompeTeamsResponse>>(
        `/api/v1/competition/admin/teams/${id}`,
      );
      return data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateBCCTeamStatus = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      status,
      reason,
    }: {
      status: string;
      reason?: string;
    }) => {
      const { data } = await api.put<ApiResponse<null>>(
        `/api/v1/competition/admin/teams/${id}`,
        { status, reason },
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bccKeys.detail(id) });
      const action = variables.reason ? "rejected" : "updated";
      toast.success(`Team status ${action} successfully`);
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update team status";
      toast.error(errorMsg);
    },
  });
};
