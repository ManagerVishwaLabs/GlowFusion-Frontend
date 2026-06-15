import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CompanySetupService from "../../../services/CompanySetup";
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState<CompanyFormData>(initialState);

  const [errors, setErrors] = useState<
    Partial<Record<keyof CompanyFormData, string>>
  >({});

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
      const response = await CompanySetupService.registerCompany(formData);
      if (response.success) {
        navigate("/login");
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
    nextStep,
    previousStep,
    resetForm,
    setErrors,

    setFormData,
    updateForm,
  };
};

export { useCompanyForm };
