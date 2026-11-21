"use client";
import { FormOprecStaffSchema } from "@/validation/oprec-staff";
import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWatch } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import useOprecHook from "../../../hooks/use-oprec";
import Form1Components from "./_components/form1";
import Form2Components from "./_components/form2";
import Form3Components from "./_components/form3";
import Form4Components from "./_components/form4";
import Form5Components from "./_components/form5";
import SuccessRegistComponent from "./_components/success-regist";

export interface SubDivisionData {
  id: string;
  name: string;
  question_1?: string | null;
  question_2?: string | null;
  question_3?: string | null;
  question_4?: string | null;
  question_5?: string | null;
  question_6?: string | null;
  study_case_question_1?: string | null;
  study_case_question_2?: string | null;
  study_case_question_3?: string | null;
}

type StepFields = {
  [key: number]: string[];
};

export const stepFields: StepFields = {
  0: [
    "name",
    "email",
    "student_id",
    "batch",
    "department",
    "phone_number",
    "line_id",
  ],
  1: [
    "about_futurest",
    "motivates_joining",
    "experience_in_organization",
    "strengths_and_weaknesses",
    "current_activities",
    "commitment_plan",
    "have_any_relations",
  ],
  2: ["primary_division_id"],
  3: ["secondary_division_id"],
  4: [
    "Ktm",
    "CurriculumVitae",
    "Twibbon",
    "RepostFeeds",
    "followed_ig_futurest",
    "followed_ig_sre",
  ],
};

export default function FormOprecStaff() {
  const { isPending, onSubmit, form, isSuccess } = useOprecHook();
  const [page, setPage] = useState(0);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
  const router = useRouter();

  // Fetch divisions
  const { data: DIVISION = [] } = useQuery<SubDivisionData[]>({
    queryKey: ["sub", "division"],
    queryFn: async () => {
      const res = await api.get("/api/v1/master/division/sub");
      const data: SubDivisionData[] = res.data.data;

      const priorityOrder = [
        "Main Event",
        "Awarding dan Closing Event",
        "Pre-Event",
      ];

      const sortedData = data.sort((a, b) => {
        const aIndex = priorityOrder.indexOf(a.name);
        const bIndex = priorityOrder.indexOf(b.name);

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;

        return a.name.localeCompare(b.name);
      });

      return sortedData;
    },
  });

  // Watch division selections
  const primaryDivisionId = useWatch({
    control: form.control,
    name: "primary_division_id",
  });

  const secondaryDivisionId = useWatch({
    control: form.control,
    name: "secondary_division_id",
  });

  const primaryDivision = DIVISION.find((d) => d.id === primaryDivisionId);
  const secondaryDivision = DIVISION.find((d) => d.id === secondaryDivisionId);

  const primaryDivisionQuestions = useMemo(() => {
    if (!primaryDivision) return [];
    const questions = [];
    for (let i = 1; i <= 6; i++) {
      const key = `question_${i}` as keyof SubDivisionData;
      if (primaryDivision[key]) {
        questions.push(i);
      }
    }
    return questions;
  }, [primaryDivision]);

  const primaryDivisionStudyCases = useMemo(() => {
    if (!primaryDivision) return [];
    const cases = [];
    for (let i = 1; i <= 3; i++) {
      const key = `study_case_question_${i}` as keyof SubDivisionData;
      if (primaryDivision[key]) {
        cases.push(i);
      }
    }
    return cases;
  }, [primaryDivision]);

  const secondaryDivisionQuestions = useMemo(() => {
    if (!secondaryDivision) return [];
    const questions = [];
    for (let i = 1; i <= 6; i++) {
      const key = `question_${i}` as keyof SubDivisionData;
      if (secondaryDivision[key]) {
        questions.push(i);
      }
    }
    return questions;
  }, [secondaryDivision]);

  const secondaryDivisionStudyCases = useMemo(() => {
    if (!secondaryDivision) return [];
    const cases = [];
    for (let i = 1; i <= 3; i++) {
      const key = `study_case_question_${i}` as keyof SubDivisionData;
      if (secondaryDivision[key]) {
        cases.push(i);
      }
    }
    return cases;
  }, [secondaryDivision]);

  const getRequiredFieldsForStep = useCallback(() => {
    if (page === 2) {
      if (!primaryDivision) return ["primary_division_id"];

      const fields = ["primary_division_id"];

      primaryDivisionQuestions.forEach((q) => {
        fields.push(`answers_primary_division_question_${q}`);
      });

      primaryDivisionStudyCases.forEach((sc) => {
        fields.push(`answers_primary_division_study_case_${sc}`);
      });

      return fields;
    }

    if (page === 3) {
      if (!secondaryDivision) return ["secondary_division_id"];

      const fields = ["secondary_division_id"];

      secondaryDivisionQuestions.forEach((q) => {
        fields.push(`answers_secondary_division_question_${q}`);
      });

      secondaryDivisionStudyCases.forEach((sc) => {
        fields.push(`answers_secondary_division_study_case_${sc}`);
      });

      return fields;
    }

    return stepFields[page] || [];
  }, [
    page,
    primaryDivision,
    secondaryDivision,
    primaryDivisionQuestions,
    primaryDivisionStudyCases,
    secondaryDivisionQuestions,
    secondaryDivisionStudyCases,
  ]);

  useEffect(() => {
    const deadline = new Date("2025-11-07T00:00:00+00:00");
    const now = new Date();

    if (now >= deadline) {
      setIsRegistrationClosed(true);
      router.push("/oprec-staff");
    }
  }, [router]);

  const isStepValid = useCallback(() => {
    const requiredFields = getRequiredFieldsForStep();
    if (requiredFields.length === 0) return true;

    // Check for errors in required fields only
    const hasErrors = requiredFields.some((f) => {
      const errors = form.formState.errors;
      return errors[f as keyof typeof errors];
    });

    if (hasErrors) return false;

    // Check if all required fields are filled
    const allFilled = requiredFields.every((f) => {
      const val = form.getValues(f as any);

      if (val === undefined) return false;
      if (val === null) return false;
      if (typeof val === "string") {
        return val.trim().length > 0;
      }
      if (val instanceof File) return true;
      if (typeof val === "boolean") return true;

      return !!val;
    });

    return allFilled;
  }, [form, getRequiredFieldsForStep]);

  const handleNextStep = async () => {
    const requiredFields = getRequiredFieldsForStep();

    if (requiredFields.length > 0) {
      const result = await form.trigger(requiredFields as any);
      if (!result) {
        return;
      }
    }

    if (isStepValid()) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSubmit = (data: z.infer<typeof FormOprecStaffSchema>) => {
    onSubmit(data);
  };

  if (isRegistrationClosed) return null;

  return (
    <>
      {isSuccess ? (
        <SuccessRegistComponent />
      ) : (
        <section className="grid h-full grid-cols-1 lg:grid-cols-2 lg:overflow-hidden">
          <div className="col-span-1 overflow-hidden lg:h-screen bg-[url(/images/oprec-staff/bg.svg)] bg-cover bg-center"></div>
          <div className="relative col-span-1">
            <div className="relative lg:h-screen lg:overflow-y-scroll">
              <div className="flex flex-col gap-9 px-6 py-12 pb-[100px]">
                <div className="flex w-full justify-between max-md:flex-col">
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-[#7A7A7A]">
                      Step: {page + 1} of 5
                    </p>
                    <p className="text-xl font-bold">
                      {page === 0
                        ? "Personal Information"
                        : page === 1
                          ? "Motivation to Join"
                          : page === 2
                            ? "Primary Division"
                            : page === 3
                              ? "Secondary Division"
                              : "Documents and Portfolio"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 md:w-1/2">
                    <Progress value={(page / 4) * 100} />
                    <p className="text-xl font-semibold text-[#7A7A7A]">
                      {Math.round((page / 4) * 100)}%
                    </p>
                  </div>
                </div>
                <Separator />
                <Form {...form}>
                  <form
                    onSubmit={(e) => {
                      form.handleSubmit(handleSubmit)(e);
                    }}
                    className="space-y-6"
                  >
                    {page === 0 && <Form1Components />}
                    {page === 1 && <Form2Components />}
                    {page === 2 && (
                      <Form3Components
                        divisions={DIVISION}
                        requiredQuestions={primaryDivisionQuestions}
                        requiredStudyCases={primaryDivisionStudyCases}
                      />
                    )}
                    {page === 3 && (
                      <Form4Components
                        divisions={DIVISION}
                        requiredQuestions={secondaryDivisionQuestions}
                        requiredStudyCases={secondaryDivisionStudyCases}
                      />
                    )}
                    {page === 4 && <Form5Components />}

                    <div className="flex justify-between">
                      {page !== 0 && (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setPage((prev) => prev - 1)}
                        >
                          Back
                        </Button>
                      )}
                      {page === 0 && <div />}
                      {page !== 4 && (
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          variant="secondary"
                          className="self-end"
                          disabled={!isStepValid()}
                          rightIcon={ArrowRight}
                        >
                          Go to Next Section
                        </Button>
                      )}
                      {page === 4 && (
                        <Button
                          type="submit"
                          variant="secondary"
                          disabled={!isStepValid() || isPending}
                        >
                          {isPending ? "Submitting..." : "Submit"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          {isPending && (
            <div className="fixed top-0 z-30 h-screen w-screen bg-slate-500 bg-opacity-55">
              <div className="grid h-full place-items-center">
                <div className="flex animate-pulse flex-col items-center gap-6">
                  <NextImage
                    src="/logo-24.png"
                    width={400}
                    height={400}
                    className="w-[250px]"
                    alt=""
                  />
                  <h4 className="text-3xl font-bold text-primary-900 lg:text-4xl">
                    Loading...
                  </h4>
                </div>
              </div>
            </div>
          )}
          <Toaster />
        </section>
      )}
    </>
  );
}
