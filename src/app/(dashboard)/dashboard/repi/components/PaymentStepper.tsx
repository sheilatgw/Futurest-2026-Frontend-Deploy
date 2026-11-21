import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
import { CreditCard, Clock, Check } from "lucide-react";

type StepIndicatorPropsType = {
  activeStep: number;
};

const steps = [
  { id: 1, label: "Payment", icon: CreditCard },
  { id: 2, label: "Pending", icon: Clock },
  { id: 3, label: "Successful", icon: Check },
];

export default function StepIndicator({ activeStep }: StepIndicatorPropsType) {
  return (
    <div className="w-full max-w-xl mx-auto my-2 md:my-8 px-4">
      <div className="relative flex items-center justify-center gap-6 md:gap-[8rem]">
        {/* background line */}
        <div className="absolute top-4 left-0 h-4 w-full rounded-full bg-gray-300" />

        {/* progress line */}
        <div
          className="absolute top-4 left-0 h-4 rounded-full bg-green-500 transition-all"
          style={{
            width:
              activeStep === 1
                ? "15%"
                : `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < activeStep;
          const isActive = step.id === activeStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full transition-all",
                  isCompleted && "bg-green-500 text-white",
                  isActive &&
                    "bg-green-500 text-white  shadow-[0_0_20px_4px_rgba(134,239,172,0.8)]",
                  !isCompleted && !isActive && "bg-gray-300 text-gray-500",
                )}
              >
                <step.icon className="h-6 w-6" />
              </div>

              <Typography as="p" className="text-sm font-medium text-white">
                {step.label}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}
