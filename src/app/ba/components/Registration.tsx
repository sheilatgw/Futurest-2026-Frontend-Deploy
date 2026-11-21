"use client";

import Button from "@/components/buttons/button";
import Image from "next/image";
import Link from "next/link"; // Tambah import Link
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import StepIndicator from "./StepIndicator";
import ConfirmSubmitModal from "./SubmitModal";
import BAQuestions from "./steps/BAQuestions";
import StepCompletion from "./steps/Completion";
import GeneralQuestions from "./steps/GeneralQuestions";
import SpecialRequirement from "./steps/SpecialReq";
import StepIdentity from "./steps/StepIdentity";
import SupportingFiles from "./steps/SupportingFiles";
import { Home } from "lucide-react"; // Optional: Icon rumah

// 🔥 HARDCODE SWITCH: Ubah ke false kalau mau buka lagi
const isRegistrationClosed = true;

interface RegistrationPageProps {
  onNext: () => Promise<void> | void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  resetError: () => void;
}

export default function RegistrationPage({
  onNext,
  isLoading,
  isSuccess,
  isError,
  resetError,
}: RegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    trigger,
    getValues,
    setError,
    formState: { isSubmitting },
  } = useFormContext();
  const isBusy = isSubmitting || isLoading;

  // ... (Logic helper function sama persis) ...
  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return [
          "name",
          "student_type",
          "student_id_number",
          "city",
          "institution_name",
          "instagram_handle",
          "follower_count",
          "instagram_public",
          "email",
          "phone",
          "line_id",
        ];
      case 2:
        return ["introduce", "about", "knowledge", "expect"];
      case 3:
        return [
          "about_ba",
          "reason_ba",
          "worked_experience",
          "strategy_promote",
          "skills",
          "question_one",
          "question_two",
        ];
      case 4:
        return [
          "willingness_upload_event",
          "willing_attend_event",
          "attend_consideration_desc",
        ];
      case 5:
        return [
          "portfolio_link",
          "student_id_file",
          "cv_file",
          "twibbon_proof",
          "follow_futurest_proof",
          "follow_sre_proof",
        ];
      default:
        return [];
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      setCurrentStep(6);
      scrollToTop();
    }
  }, [isSuccess]);

  const handleContinue = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    let isValid = await trigger(fieldsToValidate);

    if (currentStep === 4) {
      const willingness = getValues("willingness_attend_event");
      const consideration = getValues("attend_consideration_desc");

      if (willingness === "yes_considerations") {
        if (!consideration || consideration.trim() === "") {
          setError("attend_consideration_desc", {
            type: "manual",
            message: "Please explain your considerations",
          });
          isValid = false;
        }
      }
    }

    if (isValid) {
      if (currentStep === 5) {
        setIsModalOpen(true);
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 6));
        scrollToTop();
      }
    } else {
      toast.error("Please complete all required fields correctly.");
    }
  };

  const handleFinalSubmit = async () => {
    await onNext();
  };

  const handleBack = () => {
    if (currentStep === 1) {
      window.history.back();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
      scrollToTop();
    }
  };

  const handleCloseModal = () => {
    if (!isBusy) {
      setIsModalOpen(false);
      if (isError) {
        resetError();
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepIdentity />;
      case 2:
        return <GeneralQuestions />;
      case 3:
        return <BAQuestions />;
      case 4:
        return <SpecialRequirement />;
      case 5:
        return <SupportingFiles />;
      case 6:
        return <StepCompletion />;
      default:
        return null;
    }
  };

  // ---------------------------------------------------------
  // 🔥 LOGIC CLOSED REGISTRATION UI
  // ---------------------------------------------------------
  if (isRegistrationClosed) {
    return (
      <div className="min-h-screen bg-white pb-20">
        {/* Banner Tetap Ada Biar Estetik */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <Image
            src="/images/futuretalk/Banner.png"
            alt="Banner"
            fill
            className="object-cover grayscale" // Kasih grayscale dikit biar kerasa "inactive"
            priority
          />
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay gelap */}
        </div>

        <div className="w-full max-w-5xl mx-auto -mt-20 px-4 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-neutral-100">
            <div className="w-24 h-24 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6">
              {/* Ganti icon sesuai selera */}
              <span className="text-4xl">🔒</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-[#3A6AB2] mb-4">
              Pendaftaran Ditutup
            </h1>

            <p className="text-neutral-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Terima kasih atas antusiasme teman-teman! Masa pendaftaran Brand
              Ambassador Futurest 2026 saat ini sudah berakhir.
              <br className="hidden md:block" />
              Nantikan informasi selanjutnya di media sosial kami.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/">
                <Button
                  variant="primary"
                  className="bg-[#3A6AB2] hover:bg-[#2c528a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                  <Home size={18} /> Kembali ke Beranda
                </Button>
              </Link>

              <Link href="https://instagram.com/futurest.2026" target="_blank">
                <Button
                  variant="outline"
                  className="border-[#3A6AB2] text-[#3A6AB2] hover:bg-blue-50 px-8 py-3 rounded-xl font-bold"
                >
                  Cek Instagram
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 🔥 NORMAL REGISTRATION UI (Kalau isRegistrationClosed = false)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-white pb-20">
      <ConfirmSubmitModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleFinalSubmit}
        isSubmitting={isBusy}
        isError={isError}
      />

      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/futuretalk/Banner.png"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full max-w-5xl mx-auto pt-8 px-4">
        <div className="w-full aspect-[3/1] relative overflow-hidden shadow-sm rounded-2xl">
          <Image
            src="/images/ba/BrandAmbassador.svg"
            alt="BA Banner"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <StepIndicator currentStep={currentStep} />

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-10 min-h-[400px]">{renderStepContent()}</div>

        {currentStep < 6 && (
          <div className="max-md:flex-col flex gap-4 mt-8 border-t pt-8">
            <Button
              variant="outline"
              className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#3A6AB2] text-[#3A6AB2] font-bold"
              onClick={handleBack}
              disabled={isBusy}
            >
              Back
            </Button>

            <Button
              onClick={handleContinue}
              variant="primary"
              className={`
                flex-1 py-3 px-6 rounded-2xl font-bold disabled:opacity-70 border-none transition-colors
                ${
                  currentStep === 5
                    ? "bg-[#FFCE1F] text-gray-900 hover:bg-[#e6b91c]"
                    : "bg-[#3A6AB2] text-white hover:bg-[#2c528a]"
                }
              `}
              disabled={isBusy}
            >
              {isBusy
                ? "Checking..."
                : currentStep === 5
                  ? "Submit"
                  : "Continue"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
