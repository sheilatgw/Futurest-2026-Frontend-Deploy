import {
  Award,
  FileText,
  Folder,
  Medal,
  MessageCircleQuestion,
  User,
} from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { label: "Identity", icon: User },
    { label: "General Questions", icon: MessageCircleQuestion },
    { label: "BA Questions & Study Case", icon: FileText },
    { label: "Special Requirement", icon: Award },
    { label: "Supporting Files", icon: Folder },
    { label: "Completion", icon: Medal },
  ];

  const svgWidth = 1200;
  const totalSteps = steps.length;
  const segmentWidth = svgWidth / (totalSteps + 1);

  const getProgressWidth = () => {
    if (currentStep >= totalSteps) return svgWidth;
    return currentStep * segmentWidth;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-6">
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${svgWidth} 80`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* bg bar */}
          <rect
            x="0"
            y="30"
            width={svgWidth}
            height="20"
            rx="10"
            ry="10"
            fill="#E5E7EB"
          />

          {/* Progress bar */}
          <rect
            x="0"
            y="30"
            width={getProgressWidth()}
            height="20"
            rx="10"
            ry="10"
            fill="#3A6AB2"
            className="transition-all duration-700 ease-out"
          />

          {steps.map((step, index) => {
            const stepNum = index + 1;
            const positionX = stepNum * segmentWidth;
            const isActive = stepNum <= currentStep;

            return (
              <g key={index}>
                {/* Lingkaran Luar */}
                <circle
                  cx={positionX}
                  cy="40"
                  r="32"
                  fill={isActive ? "#3A6AB2" : "#F3F4F6"}
                  stroke={isActive ? "#DBEAFE" : "#E5E7EB"}
                  strokeWidth="4"
                  className="transition-all duration-300"
                />

                {/* Icon */}
                <g transform={`translate(${positionX}, 40)`}>
                  <step.icon
                    className={`${isActive ? "text-white" : "text-gray-400"}`}
                    style={{
                      transform: "translate(-12px, -12px)",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </g>
              </g>
            );
          })}
        </svg>

        <div className="relative w-full h-10">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = stepNum <= currentStep;
            const isCurrent = stepNum === currentStep;

            const leftPercent = ((stepNum * segmentWidth) / svgWidth) * 100;

            return (
              <div
                key={index}
                className={`absolute flex-col items-center top-0 w-32 
                  ${isCurrent ? "flex" : "hidden lg:flex"}
                `}
                style={{
                  left: `${leftPercent}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <span
                  className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-center leading-tight
                  transition-colors duration-300 px-1
                    ${isActive ? "text-gray-900" : "text-gray-400"}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
