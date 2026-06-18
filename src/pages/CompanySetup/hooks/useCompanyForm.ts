import { useState } from "react";

import { useToast } from "../../../hooks/toast";
import AuthService from "../../../services/auth";
import type { CompanyFormData } from "../companySetup.types";
import {
  validateStepOne,
  validateStepThree,
  validateStepTwo,
} from "../components/companySetup.validations";

type FormErrors = Partial<Record<keyof CompanyFormData, string>>;

const TOTAL_STEPS = 3;

const initialState: CompanyFormData = {
  aboutCompany: "",
  address: "",
  adminPhone: "",
  agreeTerms: false,
  companyEmail: "",
  companyLogoUrl: "",
  companyName: "",

  companySize: "",
  confirmPassword: "",
  contactPhone: "",
  country: "",
  designation: "",

  facebook: "",
  foundedYear: "",
  fullName: "",

  industry: "",
  instagram: "",
  linkedin: "",

  password: "",
  pincode: "",
  registrationNumber: "",
  twitter: "",
  userEmail: "",
  visionMission: "",
  website: "",
};

const useCompanyForm = () => {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<CompanyFormData>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CompanyFormData, string>>
  >({});
  const [successRedirect, setSuccessRedirect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Update single field
  const updateForm = <K extends keyof CompanyFormData>(
    field: K,
    value: CompanyFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove field error instantly
    setErrors((prev) => {
      if (!prev[field]) return prev;

      const updatedErrors = { ...prev };

      delete updatedErrors[field];

      return updatedErrors;
    });
  };

  // Validate based on current step
  const validateCurrentStep = () => {
    let validationErrors: FormErrors = {};
    switch (currentStep) {
      case 1:
        validationErrors = validateStepOne(formData);
        break;

      case 2:
        validationErrors = validateStepTwo(formData);
        break;

      case 3:
        validationErrors = validateStepThree(formData);
        break;

      default:
        validationErrors = {};
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // Go next step
  const nextStep = async () => {
    const isValid = validateCurrentStep();
    if (!isValid) return;

    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    if (currentStep === TOTAL_STEPS) {
      try {
        setLoading(true);
        const response = await AuthService.registerCompanyUser(formData);
        if (response.success) {
          setSuccessRedirect(true);
        }
        if (response.code) {
          toast.error(response.error?.message || response.message || "");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }

        console.error("Registration error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Go previous step
  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Jump to step
  const goToStep = (step: number) => {
    if (step < 1 || step > TOTAL_STEPS) return;

    setCurrentStep(step);
  };

  // Reset entire form
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setCurrentStep(1);
  };

  return {
    currentStep,
    errors,
    formData,

    goToStep,
    loading,
    nextStep,
    previousStep,
    resetForm,
    setErrors,
    setFormData,
    successRedirect,
    updateForm,
  };
};

export { useCompanyForm };
