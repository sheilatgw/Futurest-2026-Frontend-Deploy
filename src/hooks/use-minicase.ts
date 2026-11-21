import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation"; // 1. Import useSearchParams
import { serialize } from "object-to-formdata";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import api from "@/lib/api";
import {
  clearFormFromLocalStorage,
  loadFormFromLocalStorage,
  saveFormToLocalStorage,
} from "@/lib/form-persist";
import { ApiError, ApiResponse } from "@/types/api";
import { MinicaseParticipant } from "@/types/page/regist-minicase";
import { FormMinicaseSchema } from "@/validation/regist-minicase";

const STORAGE_KEY = "minicase_registration_form";

const useMinicase = (
  user?: { personal_info?: { email?: string; phone_number?: string } },
  onSuccess?: (id: string) => void,
) => {
  const hydratedRef = useRef(false);

  // 2. Ambil Query Param
  const searchParams = useSearchParams();
  const batchIdFromUrl = searchParams.get("batchId");

  const form = useForm<z.infer<typeof FormMinicaseSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormMinicaseSchema),
    defaultValues: {
      team_name: "",
      team_leader_name: "",
      team_leader_email: "",
      team_leader_phone: "",
      university: "",
      faculty: "",
      study_program: "",
      team_member_2_name: "",
      team_member_2_email: "",
      team_member_3_name: "",
      team_member_3_email: "",
      // 3. Set default value batch ID dari URL jika ada
      minicase_batch_id: batchIdFromUrl || "",
    },
  });

  /* ===== RESTORE FROM LOCAL STORAGE ===== */
  useEffect(() => {
    const saved = loadFormFromLocalStorage(STORAGE_KEY);
    if (saved) {
      // Logic khusus: Kita mau restore data lama, TAPI kalau batchId di URL beda (user klik batch baru)
      // Kita harus prioritaskan batchId dari URL agar user gak salah daftar batch
      if (batchIdFromUrl && saved.minicase_batch_id !== batchIdFromUrl) {
        saved.minicase_batch_id = batchIdFromUrl;
      }

      form.reset(saved);
    } else if (batchIdFromUrl) {
      // Kalau gak ada saved data, pastikan batchId terisi
      form.setValue("minicase_batch_id", batchIdFromUrl);
    }
    hydratedRef.current = true;
  }, [form, batchIdFromUrl]); // Tambahkan dependency batchIdFromUrl

  /* ===== AUTOFILL BATCH ID (Extra Safety) ===== */
  // Jaga-jaga kalau form reset menimpa value, kita paksa isi lagi kalau URL ada
  useEffect(() => {
    if (batchIdFromUrl) {
      const currentBatchId = form.getValues("minicase_batch_id");
      if (currentBatchId !== batchIdFromUrl) {
        form.setValue("minicase_batch_id", batchIdFromUrl);
      }
    }
  }, [batchIdFromUrl, form]);

  /* ===== AUTOFILL EMAIL & PHONE ===== */
  useEffect(() => {
    if (!user?.personal_info?.email) return;

    const currentEmail = form.getValues("team_leader_email");
    const currentPhone = form.getValues("team_leader_phone");

    if (!currentEmail) {
      form.setValue("team_leader_email", user.personal_info.email, {
        shouldDirty: false,
        shouldValidate: true,
      });
    }

    if (!currentPhone) {
      let formattedPhone = user.personal_info.phone_number || "";
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "62" + formattedPhone.slice(1);
      }

      form.setValue("team_leader_phone", formattedPhone, {
        shouldDirty: false,
        shouldValidate: true,
      });
    }
  }, [user, form]);

  /* ===== SAVE TO LOCAL STORAGE ===== */
  useEffect(() => {
    const sub = form.watch((value) => {
      if (!hydratedRef.current) return;
      saveFormToLocalStorage(STORAGE_KEY, value);
    });
    return () => sub.unsubscribe();
  }, [form]);

  /* ===== SUBMIT ===== */
  function onSubmit(data: z.infer<typeof FormMinicaseSchema>) {
    try {
      // --- LOGIC TAMBAHAN: Inject Batch ID dari URL jika di form kosong ---
      if (!data.minicase_batch_id && batchIdFromUrl) {
        data.minicase_batch_id = batchIdFromUrl;
      }
      // --------------------------------------------------------------------

      const formData = serialize(data, {
        indices: true,
        nullsAsUndefineds: true,
      });

      // Logging FormData (Punya Temen - File Handling Aman)
      Array.from(formData.entries()).forEach(([_key, value]) => {
        if (value instanceof File) {
          // empty string hack
        } else {
          // Log non-file values
        }
      });

      handleRegister(formData);
    } catch {
      toast.error("Error preparing form data");
    }
  }

  const {
    mutate: handleRegister,
    isPending,
    isSuccess,
  } = useMutation<
    AxiosResponse<ApiResponse<MinicaseParticipant>>,
    AxiosError<ApiError>,
    FormData
  >({
    // Mutation Function (Punya Temen)
    mutationFn: (formData) =>
      api.post("/api/v1/minicase/participants/register", formData, {
        // ⚠️ JANGAN set Content-Type manual (biar axios yang atur boundary)
        headers: { "Content-Type": undefined },
      }),

    onSuccess: (response) => {
      toast.success("Registration successful");
      clearFormFromLocalStorage(STORAGE_KEY);

      const newId = response.data.data.id;
      onSuccess?.(newId);
    },

    onError: (error) => {
      toast.error(error.response?.data.error ?? "Please Retry");
    },
  });

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useMinicase;
