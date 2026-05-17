"use client";

import { CircleCheck } from "lucide-react";

type TProps = {
  currentStep: number;
  totalSteps?: number;
};

const STEPS = [
  { id: "01", label: "Process\nOverview" },
  { id: "02", label: "Document\nVerification" },
  { id: "03", label: "Quality\nParameters" },
  { id: "04", label: "Material\nCleaning" },
  { id: "05", label: "Weight\nVerification" },
  { id: "06", label: "GRN\nGeneration" },
];

export default function StepIndicator({ currentStep }: TProps) {
  return (
    <div className="w-full bg-surface rounded-[8px] border border-table-border py-5 ">
      {/* Header Title & Subtitle */}
      <div className="text-center mb-5 text-neutral-50">
        <h2 className="  text-[24px] font-semibold  mb-2 ">
          Material Receiving Process
        </h2>
        <p className=" text-[14px]  ">
          Step-by-step material receiving with quality verification
        </p>
      </div>

      {/* Steps Indicator Bar */}
      <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-start justify-between min-w-[700px] md:min-w-0 w-full px-2 ">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={step.id}
                className="flex items-start flex-1 last:flex-none  "
              >
                {/* Step Circle & Label */}
                <div className="flex flex-col items-center flex-shrink-0 w-24 ">
                  {/* Circle Button / Indicator */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative  
                      ${
                        isCompleted
                          ? "  text-neutral-900 "
                          : isActive
                            ? "border-neutral-100 bg-transparent text-neutral-50"
                            : "border-neutral-700 bg-transparent text-neutral-500"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CircleCheck className=" size-6 text-emerald-400  " />
                    ) : (
                      // <Image
                      //   src={StepSymbol}
                      //   alt="step symbol"
                      //   width={32}
                      //   height={32}
                      //   className="  "
                      // />
                      <span className="text-[14px]  font-semibold ">
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Label Text with Split Line Rendering */}
                  <div className="mt-2 text-center min-h-[36px] flex flex-col justify-start   ">
                    {step.label.split("\n").map((line, i) => (
                      <span
                        key={i}
                        className={`text-[14px]  font-semibold   block 
                          ${
                            isCompleted
                              ? "text-emerald-400 "
                              : isActive
                                ? "text-neutral-50"
                                : "text-neutral-500"
                          }
                        `}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dotted Connector Line */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 px-1 flex items-center justify-center min-w-[30px] h-10 ">
                    <svg className="w-full h-1" overflow="visible">
                      <line
                        x1="0"
                        y1="2"
                        x2="100%"
                        y2="2"
                        stroke={
                          isCompleted
                            ? "var(--success-500, #34D399 )"
                            : "#3f3f46"
                        }
                        strokeWidth="2.5"
                        strokeDasharray="1 6"
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
