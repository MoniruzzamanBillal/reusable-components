"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Step1Form from "./form/Step1Form";
import Step2Form from "./form/Step2Form";
import Step3Form from "./form/Step3Form";
import {
  fullFormSchema,
  stepFields,
  TFullFormType,
} from "./schema/ReceivingProcess.schema";
import StepIndicator from "./StepIndicator";

const STEP_KEY = "receiving-process-step";
const TOTAL_STEPS = 3;
const stepComponents = [Step1Form, Step2Form, Step3Form];

export default function MultiForm() {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const saved = sessionStorage.getItem(STEP_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const methods = useForm<TFullFormType>({
    resolver: zodResolver(fullFormSchema),
    mode: "onChange",
    defaultValues: {
      supplierName: "",
      invoiceNumber: "",
      invoiceDate: "",
      poNumber: "",
      warehouseLocation: "",
      receivingDate: "",
      receivedBy: "",
      remarks: "",
      materialName: "",
      materialCode: "",
      materialType: "",
    },
  });

  // Persist current step
  useEffect(() => {
    sessionStorage.setItem(STEP_KEY, String(currentStep));
  }, [currentStep]);

  const handleNext = async () => {
    const fields = stepFields[currentStep];
    const isValid = await methods.trigger(fields);
    if (!isValid) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: TFullFormType) => {
    try {
      console.log("Final payload:", data);

      sessionStorage.removeItem(STEP_KEY);
    } catch (error) {
      console.error(error);
    }
  };

  const CurrentStepForm = stepComponents[currentStep];

  return (
    <div className=" p-20 ">
      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CurrentStepForm />

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border rounded"
              >
                Back
              </button>
            )}

            {currentStep < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
