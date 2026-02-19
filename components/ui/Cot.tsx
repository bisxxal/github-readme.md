"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  "Scanning repository files",
  "Analyzing project structure",
  "Detecting tech stack",
  "Extracting key features",
  "Generating README content",
  "Formatting markdown output",
];

export default function ChainOfThought() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState("");

  // Progress step every 1.6s
  useEffect(() => {
    if (currentStep >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  mx-auto  rounded-2xl p-8 ">
      
      <div className="space-y-5">
        {steps.map((step, index) => {
          const isCurrent = index === currentStep;
          const isPast = index < currentStep;
          const isFuture = index > currentStep;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 transition-all duration-500 ${
                isCurrent
                  ? "opacity-100 scale-[1.02]"
                  : isPast
                  ? "opacity-60"
                  : "opacity-20"
              }`}
            >
              {/* Icon */}
              {isPast ? (
                <CheckCircle2 size={18} className="text-green-500" />
              ) : isCurrent ? (
                <Loader2 size={18} className="text-blue-500 animate-spin" />
              ) : (
                <div className="w-[18px]" />
              )}

              {/* Text */}
              <p className="text-sm text-neutral-300">
                { !isFuture && step}
                {isCurrent && dots}
              </p>
            </div>
          );
        })}
      </div>
 
    </div>
  );
}
