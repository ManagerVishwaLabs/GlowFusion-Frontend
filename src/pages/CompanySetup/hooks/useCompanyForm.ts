import { useState } from "react";
import type { CompanyFormData } from "../types/company";
import {
  validateStepOne,
  validateStepTwo,
  validateStepThree,
} from "../components/company-setup/validations";

type FormErrors = Partial<Record<keyof CompanyFormData, string>>;

const TOTAL_STEPS = 3;

const initialState: CompanyFormData = {
  // Step 1
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  website: "",
  industry: "",
  companySize: "",
  logo: "",

  country: "",
  state: "",
  city: "",
  address: "",
  pincode: "",

  // Step 2
  aboutCompany: "",
  visionMission: "",
  foundedYear: "",
  registrationNumber: "",

  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",

  // Step 3
  fullName: "",
  email: "",
  adminPhone: "",
  designation: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

export const useCompanyForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState<CompanyFormData>(initialState);

  const [errors, setErrors] = useState<FormErrors>({});

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
  const nextStep = () => {
    const isValid = validateCurrentStep();
    if (!isValid) return;

    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
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
    formData,
    errors,

    updateForm,
    nextStep,
    previousStep,
    goToStep,
    resetForm,

    setFormData,
    setErrors,
  };
};
