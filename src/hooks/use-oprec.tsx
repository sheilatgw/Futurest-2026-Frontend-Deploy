import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { serialize } from "object-to-formdata";
import { useForm } from "react-hook-form";
import { z } from "zod";

import api from "@/lib/api";
import useRegisterFormStore from "@/stores/use-oprec-form-store";
import { ApiError, ApiResponse } from "@/types/api";
import { TypeOprecStaff } from "@/types/page/oprec-staff";
import { FormOprecStaffSchema } from "@/validation/oprec-staff";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const useOprecHook = () => {
  const { fileAttachment, resetFiles } = useRegisterFormStore();

  // ============== Form Handling ==============
  const form = useForm<z.infer<typeof FormOprecStaffSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormOprecStaffSchema),
    defaultValues: {
      // === FORM 1 ===
      name: "",
      email: "",
      student_id: "",
      batch: "",
      department: "",
      phone_number: "",
      line_id: "",

      // === FORM 2 ===
      about_futurest: "",
      motivates_joining: "",
      experience_in_organization: "",
      strengths_and_weaknesses: "",
      commitment_plan: "",
      current_activities: "",
      have_any_relations: "",

      // === FORM 3 ===
      primary_division_id: "",
      answers_primary_division_question_1: "",
      answers_primary_division_question_2: "",
      answers_primary_division_question_3: "",
      answers_primary_division_question_4: "",
      answers_primary_division_question_5: "",
      answers_primary_division_question_6: "",
      answers_primary_division_study_case_1: "",
      answers_primary_division_study_case_2: "",
      answers_primary_division_study_case_3: "",

      // === FORM 4 ===
      secondary_division_id: "",
      answers_secondary_division_question_1: "",
      answers_secondary_division_question_2: "",
      answers_secondary_division_question_3: "",
      answers_secondary_division_question_4: "",
      answers_secondary_division_question_5: "",
      answers_secondary_division_question_6: "",
      answers_secondary_division_study_case_1: "",
      answers_secondary_division_study_case_2: "",
      answers_secondary_division_study_case_3: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormOprecStaffSchema>) {
    const payload = {
      name: data.name,
      email: data.email,
      student_id: data.student_id,
      batch: data.batch,
      department: data.department,
      phone_number: data.phone_number,
      line_id: data.line_id,
      about_futurest: data.about_futurest,
      motivates_joining: data.motivates_joining,
      experience_in_organization: data.experience_in_organization,
      strengths_and_weaknesses: data.strengths_and_weaknesses,
      commitment_plan: data.commitment_plan,
      current_activities: data.current_activities,
      have_any_relations: data.have_any_relations,
      primary_division_id: data.primary_division_id,
      answers_primary_division_question_1:
        data.answers_primary_division_question_1,
      answers_primary_division_question_2:
        data.answers_primary_division_question_2,
      answers_primary_division_question_3:
        data.answers_primary_division_question_3,
      answers_primary_division_question_4:
        data.answers_primary_division_question_4,
      answers_primary_division_question_5:
        data.answers_primary_division_question_5,
      answers_primary_division_question_6:
        data.answers_primary_division_question_6,
      answers_primary_division_study_case_1:
        data.answers_primary_division_study_case_1,
      answers_primary_division_study_case_2:
        data.answers_primary_division_study_case_2,
      answers_primary_division_study_case_3:
        data.answers_primary_division_study_case_3,
      secondary_division_id: data.secondary_division_id,
      answers_secondary_division_question_1:
        data.answers_secondary_division_question_1,
      answers_secondary_division_question_2:
        data.answers_secondary_division_question_2,
      answers_secondary_division_question_3:
        data.answers_secondary_division_question_3,
      answers_secondary_division_question_4:
        data.answers_secondary_division_question_4,
      answers_secondary_division_question_5:
        data.answers_secondary_division_question_5,
      answers_secondary_division_question_6:
        data.answers_secondary_division_question_6,
      answers_secondary_division_study_case_1:
        data.answers_secondary_division_study_case_1,
      answers_secondary_division_study_case_2:
        data.answers_secondary_division_study_case_2,
      answers_secondary_division_study_case_3:
        data.answers_secondary_division_study_case_3,
      ktm: fileAttachment.Ktm,
      curriculum_vitae: fileAttachment.CurriculumVitae,
      twibbon: fileAttachment.Twibbon,
      repost_feeds: fileAttachment.RepostFeeds,
      followed_ig_futurest: fileAttachment.followed_ig_futurest,
      followed_ig_sre: fileAttachment.followed_ig_sre,
      portfolio_asset_link: fileAttachment.portfolio_asset,
    };

    try {
      const formData = serialize(payload, {
        indices: false,
        nullsAsUndefineds: true,
      });

      handleRegister(formData);
    } catch (_error) {
      toast.error("Error preparing form data");
    }
  }

  // ================= Integration Handling =================
  const {
    mutate: handleRegister,
    isPending,
    isSuccess,
  } = useMutation<
    AxiosResponse<ApiResponse<TypeOprecStaff>>,
    AxiosError<ApiError>,
    FormData
  >({
    mutationFn: async (data) =>
      await api.post("/api/v1/oprec-staff", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      toast.success("Registration successful");
      resetFiles();
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data.error) {
        toast.error(error.response?.data.error);
        return;
      }
      toast.error("Please Retry");
    },
  });

  return {
    isPending,
    onSubmit,
    form,
    isSuccess,
  };
};

export default useOprecHook;
