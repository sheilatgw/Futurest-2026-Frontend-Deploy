// components/PaymentStepper.tsx
"use client";

import Typography from "@/components/typography";
import { Check } from "lucide-react";

export default function StepIndicator({ activeStep }: { activeStep: number }) {
  const steps = [
    { num: 1, label: "Pembayaran" },
    { num: 2, label: "Verifikasi" },
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-sm mx-auto mt-4 md:mt-6">
      {steps.map((step, index) => {
        const isActive = activeStep === step.num;
        const isCompleted = activeStep > step.num;

        return (
          <div key={step.num} className="flex items-center">
            {/* Circle & Label */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-base md:text-lg transition-all duration-500 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110"
                    : isCompleted
                      ? "bg-[#FFCE21] text-white"
                      : "bg-white/20 text-white/60"
                }`}
              >
                {isCompleted ? <Check size={24} strokeWidth={3} /> : step.num}
              </div>
              <Typography
                className={`text-xs md:text-sm font-semibold transition-all duration-300 ${
                  isActive ? "text-white" : "text-white/60"
                }`}
              >
                {step.label}
              </Typography>
            </div>

            {/* Connecting Line */}
            {index !== steps.length - 1 && (
              <div className="flex items-center -mt-6">
                <div
                  className={`w-16 md:w-28 h-[3px] mx-2 md:mx-4 rounded-full transition-all duration-500 ${
                    isCompleted ? "bg-[#FFCE21]" : "bg-white/20"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
