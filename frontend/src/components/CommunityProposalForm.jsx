import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Save, Send, ArrowLeft, ArrowRight, FileText } from "lucide-react";

import StepIndicator from "./StepIndicator";
import { getStepSchema } from "../validation/schemas";
import { applicationService } from "../services/applicationService";

// Import Community Proposal step components
import Step1FrontPage from "./steps/Step1FrontPage";
import Step2BackgroundInfo from "./steps/Step2BackgroundInfo";
import Step3ProjectGoals from "./steps/Step3ProjectGoals";
import Step4ImplementationPlan from "./steps/Step4ImplementationPlan";
import Step5RiskScreening from "./steps/Step5RiskScreening";
import Step6MonitoringEvaluation from "./steps/Step6MonitoringEvaluation";
import Step7Sustainability from "./steps/Step7Sustainability";
import Step8Budget from "./steps/Step8Budget";
import Step9RiskManagement from "./steps/Step9RiskManagement";
import Step10Attachments from "./steps/Step10Attachments";

const STEPS = [
  {
    id: 1,
    title: "Front Page",
    component: Step1FrontPage,
    description: "Organization details and project overview",
  },
  {
    id: 2,
    title: "Background Information",
    component: Step2BackgroundInfo,
    description: "Project summary and organizational background",
  },
  {
    id: 3,
    title: "Project Goals & Objectives",
    component: Step3ProjectGoals,
    description: "Goals, objectives and logical framework",
  },
  {
    id: 4,
    title: "Implementation & Indicators",
    component: Step4ImplementationPlan,
    description: "Implementation plan and Belize Fund Management indicators",
  },
  {
    id: 5,
    title: "Risk Screening",
    component: Step5RiskScreening,
    description: "Environmental and social risk assessment",
  },
  {
    id: 6,
    title: "Monitoring & Evaluation",
    component: Step6MonitoringEvaluation,
    description: "M&E plan and framework",
  },
  {
    id: 7,
    title: "Sustainability",
    component: Step7Sustainability,
    description: "Sustainability and replication plans",
  },
  {
    id: 8,
    title: "Budget",
    component: Step8Budget,
    description: "Detailed budget breakdown",
  },
  {
    id: 9,
    title: "Risk Management",
    component: Step9RiskManagement,
    description: "Stakeholder engagement, gender action, and risk management plans",
  },
  {
    id: 10,
    title: "Attachments",
    component: Step10Attachments,
    description: "Supporting documents and declarations",
  },
];

const CommunityProposalForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [applicationId, setApplicationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(getStepSchema(currentStep)),
    mode: "onChange",
  });

  const saveProgress = async (stepData = null) => {
    try {
      setIsSaving(true);
      const formData = stepData || getValues();

      if (applicationId) {
        // Update existing application
        await applicationService.saveProgress(applicationId, {
          currentStep,
          stepData: formData,
          completedSteps,
        });
      } else {
        // Create new application
        const newApplication = await applicationService.createApplication(
          formData
        );
        setApplicationId(newApplication._id);
      }

      toast.success("Progress saved successfully!");
    } catch (error) {
      toast.error("Failed to save progress");
      console.error("Error saving progress:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = async () => {
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Please fix the errors before proceeding");
      return;
    }

    const formData = getValues();
    await saveProgress(formData);

    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (stepNumber) => {
    if (stepNumber <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(stepNumber);
    }
  };

  const submitApplication = async () => {
    try {
      setIsLoading(true);
      const formData = getValues();

      let currentApplicationId = applicationId;

      // If no applicationId, save progress first to create one
      if (!currentApplicationId) {
        const newApplication = await applicationService.createApplication(
          formData
        );
        currentApplicationId = newApplication._id;
        setApplicationId(currentApplicationId);
      }

      const result = await applicationService.submitApplication(
        currentApplicationId,
        formData
      );

      if (result.zohoSuccess) {
        toast.success(
          "Community Proposal submitted successfully and record created in Zoho Creator! Thank you for your submission."
        );
      } else if (result.zohoError) {
        toast.success(
          "Community Proposal submitted successfully! Thank you for your submission."
        );
        toast.error(`Zoho Creator: ${result.zohoError}`);
      } else {
        toast.success(
          "Community Proposal submitted successfully! Thank you for your submission."
        );
      }

      // Reset form to initial state after successful submission
      reset();
      setCurrentStep(1);
      setCompletedSteps([]);
      setApplicationId(null);
    } catch (error) {
      toast.error("Failed to submit application");
      console.error("Error submitting application:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1]?.component;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-lg border border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Belize Fund Community Grants Proposal
              </h1>
              <p className="text-gray-600 mt-1">
                Community Grants Proposal Template
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((completedSteps.length / STEPS.length) * 100)}%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg border-x border-gray-200">
        {/* Progress Indicator */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200 overflow-hidden">
          <StepIndicator
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goToStep}
          />
        </div>

        {/* Form Content */}
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {STEPS[currentStep - 1]?.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {STEPS[currentStep - 1]?.description}
                </p>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Step {currentStep} of {STEPS.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(nextStep)} className="space-y-6">
            {CurrentStepComponent && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <CurrentStepComponent
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                  watch={watch}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => saveProgress()}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : "Save Progress"}</span>
                </button>
              </div>

              <div>
                {currentStep < STEPS.length ? (
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitApplication}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {isLoading ? "Submitting..." : "Submit Community Proposal"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 rounded-b-xl shadow-lg border border-t-0 border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            All fields marked with <span className="text-red-500">*</span> are
            required
          </div>
          <div>
            Contact: projectofficer@belizefund.bz for assistance
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityProposalForm;
