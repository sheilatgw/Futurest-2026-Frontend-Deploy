import { CheckCircle, User, Wallet } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number; // 1, 2, atau 3
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { label: "Team Information", icon: User },
    { label: "Payment", icon: Wallet },
    { label: "Completion", icon: CheckCircle },
  ];

  // Logika untuk menentukan lebar progress bar biru (dalam koordinat SVG 800)
  const getProgressWidth = () => {
    if (currentStep === 1) return "200";
    if (currentStep === 2) return "400";
    return "800"; // Full jika step 3
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-6">
      <div className="relative w-full">
        <svg
          viewBox="0 0 800 80"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background bar abu-abu */}
          <rect
            x="0"
            y="30"
            width="800"
            height="20"
            rx="10"
            ry="10"
            fill="#E5E7EB"
          />

          {/* Progress bar biru */}
          <rect
            x="0"
            y="30"
            width={getProgressWidth()}
            height="20"
            rx="10"
            ry="10"
            fill="#2563EB"
            className="transition-all duration-500"
          />

          {/* Step 1: Team Info (Posisi 200) */}
          <circle
            cx="200"
            cy="40"
            r="32"
            fill={currentStep >= 1 ? "#2563EB" : "#F3F4F6"}
            stroke={currentStep >= 1 ? "#DBEAFE" : "#E5E7EB"}
            strokeWidth="4"
            className="transition-all duration-300"
          />
          <g transform="translate(200, 40)">
            <User
              className={`${currentStep >= 1 ? "text-white" : "text-gray-400"}`}
              style={{
                transform: "translate(-12px, -12px)",
                width: "24px",
                height: "24px",
              }}
            />
          </g>

          {/* Step 2: Payment (Posisi 400) */}
          <circle
            cx="400"
            cy="40"
            r="32"
            fill={currentStep >= 2 ? "#2563EB" : "#F3F4F6"}
            stroke={currentStep >= 2 ? "#DBEAFE" : "#E5E7EB"}
            strokeWidth="4"
            className="transition-all duration-300"
          />
          <g transform="translate(400, 40)">
            <Wallet
              className={`${currentStep >= 2 ? "text-white" : "text-gray-400"}`}
              style={{
                transform: "translate(-12px, -12px)",
                width: "24px",
                height: "24px",
              }}
            />
          </g>

          {/* Step 3: Completion (Posisi 600) */}
          <circle
            cx="600"
            cy="40"
            r="32"
            fill={currentStep >= 3 ? "#2563EB" : "#F3F4F6"}
            stroke={currentStep >= 3 ? "#DBEAFE" : "#E5E7EB"}
            strokeWidth="4"
            className="transition-all duration-300"
          />
          <g transform="translate(600, 40)">
            <CheckCircle
              className={`${currentStep >= 3 ? "text-white" : "text-gray-400"}`}
              style={{
                transform: "translate(-12px, -12px)",
                width: "24px",
                height: "24px",
              }}
            />
          </g>
        </svg>

        {/* Labels */}
        <div className="relative flex justify-between w-full mt-2 sm:mt-3 h-10">
          {steps.map((step, index) => {
            const isActive = index + 1 <= currentStep;
            // Menyesuaikan posisi label dengan CX di SVG (200/800 = 25%, 400/800 = 50%, 600/800 = 75%)
            const positions = ["25%", "50%", "75%"];

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center"
                style={{
                  left: positions[index],
                  transform: "translateX(-50%)",
                }}
              >
                <span
                  className={`text-xs sm:text-sm md:text-base font-semibold text-center whitespace-nowrap transition-colors duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
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
