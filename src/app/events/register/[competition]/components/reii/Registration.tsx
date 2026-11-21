"use client";

import Button from "@/components/buttons/button";
import { CompetitionTeam } from "@/types/page/regist-competition";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import StepIndicator from "../shared/StepIndicator";
import ConfirmSubmitModal from "../shared/SubmitModal";
import StepCompletion from "./steps/Completion";
import PaymentPage from "./steps/Payment";
import SubmissionSection from "./steps/Submission";
import TeamSection from "./steps/TeamSection";

interface RegistrationPageProps {
  onNext: () => Promise<CompetitionTeam | void> | void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  resetError: () => void;
  teamData: CompetitionTeam | null;
  isPendingPayment?: boolean;
}

export default function RegistrationPage({
  onNext,
  isLoading,
  isSuccess,
  isError,
  resetError,
  teamData,
  isPendingPayment = false,
}: RegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [openTeamSection, setOpenTeamSection] = useState<string | null>(
    "leader",
  );
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLinkSaved, setIsLinkSaved] = useState(false);

  const {
    trigger,
    getValues,
    formState: { isSubmitting },
  } = useFormContext();

  const isBusy = isSubmitting || isLoading;

  const handleTeamToggle = (section: string) => {
    setOpenTeamSection((prev) => (prev === section ? null : section));
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1: {
        // Team Information
        const fields = [
          "team_name",
          "university",
          "supervisor_name",
          "supervisor_phone",
          "leader_name",
          "leader_phone",
          "leader_email",
          "leader_ktm",
          "leader_instagram_follow_futurest",
          "leader_instagram_follow_sre",
          "leader_twibbon_upload",
          "leader_ig_story",
          "leader_poster_sharing",
          "leader_public_account_proof",
          "member_0_name",
          "member_0_phone",
          "member_0_email",
          "member_0_ktm",
          "member_0_instagram_follow_futurest",
          "member_0_instagram_follow_sre",
          "member_0_twibbon_upload",
          "member_0_ig_story",
          "member_0_poster_sharing",
          "member_0_public_account_proof",
        ];

        const member1Fields = [
          "member_1_name",
          "member_1_phone",
          "member_1_email",
          "member_1_ktm",
          "member_1_instagram_follow_futurest",
          "member_1_instagram_follow_sre",
          "member_1_twibbon_upload",
          "member_1_ig_story",
          "member_1_poster_sharing",
          "member_1_public_account_proof",
        ];
        const shouldValidateMember2 = member1Fields.some((field) =>
          Boolean(getValues(field)),
        );

        if (shouldValidateMember2) {
          fields.push(...member1Fields);
        }

        return fields;
      }
      case 2: // Payment
        return ["leader_payment_proof"];
      case 3: // Submission
        return ["google_drive_link", "drive_public_check"];
      default:
        return [];
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-redirect logic: Kalau PENDING_PAYMENT, paksa ke Step 2 (Payment)
  useEffect(() => {
    if (isPendingPayment && teamData) {
      setCurrentStep(2);
      scrollToTop();
    }
  }, [isPendingPayment, teamData]);

  // Only auto-redirect to completion after step 3 submission succeeds
  // Don't auto-redirect just because isSuccess is true from step 1
  useEffect(() => {
    if (isSuccess && currentStep === 4) {
      // Already at completion, do nothing
      scrollToTop();
    }
  }, [isSuccess, currentStep]);

  const handleContinue = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === 1) {
        try {
          await onNext();
          // Only proceed to step 2 if successful
          setCurrentStep(2);
          scrollToTop();
        } catch (error) {
          // Error already shown via toast in hook, just prevent navigation
        }
      } else {
        // Skip modal for step 3, just continue to step 4
        setCurrentStep((prev) => Math.min(prev + 1, 4));
        scrollToTop();
      }
    } else {
      toast.error("Please complete all required fields correctly.");
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      await onNext();
      // Close modal and navigate to completion
      setIsSubmitModalOpen(false);
      setCurrentStep(4);
      scrollToTop();
    } catch (error) {
      // Error already shown via toast in hook
      setIsSubmitModalOpen(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      window.history.back();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
      scrollToTop();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full">
            <TeamSection
              title="Team Leader"
              prefix="leader"
              isLeader
              isOpen={openTeamSection === "leader"}
              onToggle={() => handleTeamToggle("leader")}
            />
            <TeamSection
              title="Team Member 1"
              prefix="member_0"
              isOpen={openTeamSection === "member_0"}
              onToggle={() => handleTeamToggle("member_0")}
            />
            <TeamSection
              title="Team Member 2"
              prefix="member_1"
              isOpen={openTeamSection === "member_1"}
              onToggle={() => handleTeamToggle("member_1")}
            />
          </div>
        );

      case 2:
        return (
          <PaymentPage
            onBack={handleBack}
            onNext={() => {
              setCurrentStep(3);
              scrollToTop();
            }}
            data={teamData}
          />
        );
      case 3:
        return (
          <div className="w-full">
            <SubmissionSection
              isOpen={isSubmissionOpen}
              onToggle={() => setIsSubmissionOpen(!isSubmissionOpen)}
              teamId={teamData?.id}
              onSuccess={setIsLinkSaved}
            />
          </div>
        );

      case 4:
        return <StepCompletion />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative w-full h-[220px] sm:h-[350px] md:h-[450px] overflow-hidden">
        <Image
          src="/images/reii/banner-reii.webp"
          alt="Banner"
          fill
          className="object-cover object-center hidden sm:block"
          priority
        />
        <Image
          src="/images/reii/banner-reii-mobile.webp"
          alt="Banner"
          fill
          className="object-cover object-center sm:hidden"
          priority
        />
      </div>

      <StepIndicator currentStep={currentStep} />

      <main className="max-w-4xl mx-auto px-4">
        <div className="mb-10 min-h-[400px]">{renderStepContent()}</div>

        {currentStep !== 4 && currentStep !== 2 && (
          <div className="max-md:flex-col flex gap-4 mt-8 border-t pt-8">
            <Button
              variant="outline"
              className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#3A6AB2] text-[#3A6AB2] font-bold hover:bg-gray-300 transition-colors"
              onClick={handleBack}
              disabled={isBusy}
            >
              Back
            </Button>

            <Button
              onClick={handleContinue}
              variant="primary"
              className="
                flex-1 py-3 px-6 rounded-2xl font-bold disabled:opacity-70 border-none transition-colors bg-[#3A6AB2] text-white hover:bg-[#2c528a]
              "
              disabled={isBusy || (currentStep === 3 && !isLinkSaved)}
            >
              {isBusy
                ? "Processing..."
                : currentStep === 3
                  ? "Submit Registration"
                  : "Continue"}
            </Button>
          </div>
        )}
      </main>

      {/* Submit Confirmation Modal */}
      <ConfirmSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        isSubmitting={isLoading}
        isError={isError}
      />
    </div>
  );
}
