import { CreditCard, Folder, Medal, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const pathname = usePathname();

  // Detect competition type from URL
  const getCompetitionColor = () => {
    if (pathname?.includes("/bcc")) return "#3A6AB2"; // BCC Blue
    if (pathname?.includes("/reii")) return "#3b6db3"; // REII Blue
    if (pathname?.includes("/repi")) return "#13C290"; // REPI Green
    return "#3A6AB2"; // Default to BCC color
  };

  const primaryColor = getCompetitionColor();

  const steps = [
    { label: "Team Information", icon: MessageSquare },
    { label: "Payment", icon: CreditCard },
    { label: "Submission", icon: Folder },
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-16 mb-8">
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${svgWidth} 80`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background Bar (Abu-abu) */}
          <rect
            x="0"
            y="30"
            width={svgWidth}
            height="20"
            rx="10"
            ry="10"
            fill="#E5E7EB"
          />

          {/* Progress Bar (Dynamic Color) */}
          <rect
            x="0"
            y="30"
            width={getProgressWidth()}
            height="20"
            rx="10"
            ry="10"
            fill={primaryColor}
            className="transition-all duration-700 ease-out"
          />

          {/* Render Lingkaran & Icon */}
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const positionX = stepNum * segmentWidth;
            const isActive = stepNum <= currentStep;

            return (
              <g key={index}>
                <circle
                  cx={positionX}
                  cy="40"
                  r="32"
                  fill={isActive ? primaryColor : "#D1D5DB"}
                  stroke={isActive ? "#DBEAFE" : "#E5E7EB"}
                  strokeWidth="4"
                  className="transition-all duration-300"
                />

                {/* Icon di Tengah */}
                <g transform={`translate(${positionX}, 40)`}>
                  <step.icon
                    className="text-white"
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

        <div className="relative w-full h-10 mt-2">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = stepNum <= currentStep;
            const isCurrent = stepNum === currentStep;

            const leftPercent = ((stepNum * segmentWidth) / svgWidth) * 100;

            return (
              <div
                key={index}
                className={`absolute flex-col items-center top-0 w-32 
                  ${isCurrent ? "flex" : "hidden sm:flex"} 
                `}
                style={{
                  left: `${leftPercent}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <span
                  className={`text-xs sm:text-sm font-bold text-center leading-tight
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
