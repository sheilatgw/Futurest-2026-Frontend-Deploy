import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
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
import { BASchema } from "@/validation/ba-schema";

const STORAGE_KEY = "ba_registration_form";

const useBrandAmbassador = (
  user?: { personal_info?: { email?: string; phone_number?: string } },
  onSuccessCallback?: () => void,
) => {
  const hydratedRef = useRef(false);

  const form = useForm<z.infer<typeof BASchema>>({
    mode: "onChange",
    resolver: zodResolver(BASchema) as any,
    defaultValues: {
      name: "",
      student_type: undefined,
      student_id_number: "",
      follower_count: undefined,
      instagram_public: undefined,
      city: "",
      institution_name: "",
      instagram_handle: "",
      email: "",
      phone: "",
      line_id: "",
      introduce: "",
      about: "",
      knowledge: "",
      expect: "",
      about_ba: "",
      reason_ba: "",
      worked_experience: "",
      strategy_promote: "",
      skills: "",
      question_one: "",
      question_two: "",
      willingness_upload_event: "",
      willing_attend_event: undefined,
      attend_consideration_desc: "",
      portfolio_link: "",
      student_id_file: undefined,
      cv_file: undefined,
      twibbon_proof: undefined,
      follow_futurest_proof: undefined,
      follow_sre_proof: undefined,
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

    // HAPUS pengecekan "if (!currentEmail)"
    // Biarkan email dari akun login SELALU menimpa isi form/localstorage
    form.setValue("email", user.personal_info.email, {
      shouldDirty: false,
      shouldValidate: true,
    });

    // Untuk phone number, logic-nya boleh tetap di cek dulu kalau mau
    const currentPhone = form.getValues("phone");
    if (!currentPhone && user.personal_info.phone_number) {
      let formattedPhone = user.personal_info.phone_number;
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "62" + formattedPhone.slice(1);
      }

      form.setValue("phone", formattedPhone, {
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

  function onSubmit(data: z.infer<typeof BASchema>) {
    try {
      const formData = serialize(data, {
        indices: true,
        nullsAsUndefineds: true,
      });
      const uploadBool =
        data.willingness_upload_event === "no" ? "false" : "true";
      formData.set("willingness_upload_event", uploadBool);
      const attendBool = data.willing_attend_event === "no" ? "false" : "true";
      formData.set("willing_attend_event", attendBool);
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
      api.post("/api/v1/brand-ambassador/apply", formData, {
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

export default useBrandAmbassador;
