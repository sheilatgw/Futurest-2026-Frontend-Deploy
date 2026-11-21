"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { serialize } from "object-to-formdata";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "@/lib/api";
import {
  clearFormFromLocalStorage,
  loadFormFromLocalStorage,
  saveFormToLocalStorage,
} from "@/lib/form-persist";
import { ApiError, ApiResponse } from "@/types/api";
import {
  CompetitionFormValues,
  CompetitionSchema,
} from "@/validation/competition";

type UseCompetitionRegistrationOptions = {
  onSuccess?: (id: string) => void;
};

export const useCompetitionRegistration = ({
  onSuccess,
}: UseCompetitionRegistrationOptions = {}) => {
  const hydratedRef = useRef(false);
  const searchParams = useSearchParams();
  const batchIdFromUrl = searchParams.get("batchId");
  const STORAGE_KEY = `competition_form_${batchIdFromUrl}`;

  const methods = useForm<CompetitionFormValues>({
    mode: "onChange",
    resolver: zodResolver(CompetitionSchema),
    defaultValues: {
      competition_batch_id: batchIdFromUrl || "",
    } as Partial<CompetitionFormValues>,
  });

  /* restore from local storage */
  useEffect(() => {
    const saved = loadFormFromLocalStorage(STORAGE_KEY);
    if (saved) {
      if (batchIdFromUrl && saved.competition_batch_id !== batchIdFromUrl) {
        saved.competition_batch_id = batchIdFromUrl;
      }
      methods.reset(saved);
    } else if (batchIdFromUrl) {
      methods.setValue("competition_batch_id", batchIdFromUrl);
    }
    hydratedRef.current = true;
  }, [methods, batchIdFromUrl, STORAGE_KEY]);

  /* autofill batchid */
  useEffect(() => {
    if (batchIdFromUrl) {
      const currentBatchId = methods.getValues("competition_batch_id");
      if (currentBatchId !== batchIdFromUrl) {
        methods.setValue("competition_batch_id", batchIdFromUrl);
      }
    }
  }, [batchIdFromUrl, methods]);

  /* save to local storage */
  useEffect(() => {
    const sub = methods.watch((value) => {
      if (!hydratedRef.current) return;
      saveFormToLocalStorage(STORAGE_KEY, value);
    });
    return () => sub.unsubscribe();
  }, [methods, STORAGE_KEY]);

  const { mutateAsync, isPending, isSuccess, isError } = useMutation<
    AxiosResponse<ApiResponse<any>>,
    AxiosError<ApiError>,
    FormData
  >({
    mutationFn: (formData: FormData) =>
      api.post("/api/v1/competition/register", formData, {
        headers: { "Content-Type": undefined },
      }),
    onSuccess: (res) => {
      toast.success("Registration successful!");
      clearFormFromLocalStorage(STORAGE_KEY);
      const id = res.data.data?.id;
      if (id) onSuccess?.(id);
    },
    onError: (err) => {
      const status = err.response?.status;
      const backendMessage =
        err.response?.data?.message || err.response?.data?.error;

      let userMessage = "Registration failed. Please try again.";

      if (status === 409) {
        userMessage = "You have already registered for this competition.";
      } else if (status === 400) {
        userMessage =
          backendMessage ||
          "Invalid registration data. Please check your input.";
      } else if (status === 401 || status === 403) {
        userMessage = "Authentication error. Please login again.";
      } else if (status === 500) {
        userMessage = "Server error. Please try again later.";
      } else if (backendMessage) {
        userMessage = backendMessage;
      }

      toast.error(userMessage);
    },
  });

  const buildMemberPayload = (data: CompetitionFormValues) => {
    const members = [
      {
        name: data.member_0_name,
        email: data.member_0_email,
        phone: data.member_0_phone,
      },
    ];

    const member1Values = [
      data.member_1_name?.trim(),
      data.member_1_email?.trim(),
      data.member_1_phone?.trim(),
    ];
    const hasMember1Identity = member1Values.some(Boolean);

    if (hasMember1Identity) {
      members.push({
        name: data.member_1_name?.trim() || "",
        email: data.member_1_email?.trim() || "",
        phone: data.member_1_phone?.trim() || "",
      });
    }

    return members;
  };

  const submitForm = async () => {
    const data = methods.getValues();

    // Inject batch ID dari URL jika di form kosong
    if (!data.competition_batch_id && batchIdFromUrl) {
      data.competition_batch_id = batchIdFromUrl;
    }

    // Inject default values for fields that will be filled in later steps
    if (!data.leader_payment_proof) {
      const placeholderBlob = new Blob(["placeholder"], { type: "text/plain" });
      data.leader_payment_proof = new File(
        [placeholderBlob],
        "placeholder.txt",
        { type: "text/plain" },
      );
    }

    if (!data.statement_of_originality) {
      const pdfContent = new Blob(
        ["%PDF-1.4\n%âãÏÓ\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"],
        { type: "application/pdf" },
      );

      data.statement_of_originality = new File(
        [pdfContent],
        "placeholder.pdf",
        {
          type: "application/pdf",
        },
      );
    }
    if (!data.abstract) {
      const pdfContent = new Blob(
        ["%PDF-1.4\n%âãÏÓ\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"],
        { type: "application/pdf" },
      );

      data.abstract = new File([pdfContent], "placeholder.pdf", {
        type: "application/pdf",
      });
    }

    if (!data.google_drive_link || data.google_drive_link === "") {
      // Use placeholder URL that will be updated in step 3
      data.google_drive_link = "";
    }

    if (data.drive_public_check === undefined) {
      data.drive_public_check = false;
    }

    const payload = {
      ...data,
      members: buildMemberPayload(data),
    };

    const formData = serialize(payload, {
      indices: true,
      nullsAsUndefineds: true,
    });

    const response = await mutateAsync(formData);
    return response.data.data;
  };

  return {
    methods,
    submitForm,
    isLoading: isPending,
    isSuccess,
    isError,
  } as const;
};

type UpdateGoogleDriveLinkParams = {
  google_drive_link: string;
  drive_public_check?: boolean;
  link_public_check?: boolean;
};
type UseUpdateGoogleDriveLinkOptions = {
  onSuccess?: () => void;
};
export const useUpdateGoogleDriveLink = (
  teamId: string,
  { onSuccess }: UseUpdateGoogleDriveLinkOptions = {},
) => {
  const { mutateAsync, isPending, isSuccess, isError } = useMutation<
    AxiosResponse<ApiResponse<any>>,
    AxiosError<ApiError>,
    UpdateGoogleDriveLinkParams
  >({
    mutationFn: (data: UpdateGoogleDriveLinkParams) =>
      api.put(`/api/v1/competition/teams/${teamId}/google-drive-link`, data),
    onSuccess: () => {
      toast.success("Google Drive link updated successfully!");
      onSuccess?.();
    },
    onError: (err) => {
      const status = err.response?.status;
      const backendMessage =
        err.response?.data?.message || err.response?.data?.error;
      let userMessage = "Failed to update Google Drive link. Please try again.";
      if (status === 400) {
        userMessage =
          backendMessage || "Invalid data. Please check your input.";
      } else if (status === 401 || status === 403) {
        userMessage = "Authentication error. Please login again.";
      } else if (status === 404) {
        userMessage = "Team not found.";
      } else if (status === 500) {
        userMessage = "Server error. Please try again later.";
      } else if (backendMessage) {
        userMessage = backendMessage;
      }
      toast.error(userMessage);
    },
  });
  const updateGoogleDriveLink = async (data: UpdateGoogleDriveLinkParams) => {
    const response = await mutateAsync(data);
    return response.data.data;
  };
  return {
    updateGoogleDriveLink,
    isLoading: isPending,
    isSuccess,
    isError,
  } as const;
};

export default useCompetitionRegistration;
