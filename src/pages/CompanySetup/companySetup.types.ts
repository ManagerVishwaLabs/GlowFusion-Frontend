type CompanyFormData = {
  // STEP 1
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  website: string;
  industry: string;
  companySize: string;
  country: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  logo: string;

  // STEP 2
  aboutCompany: string;
  visionMission: string;
  foundedYear: string;
  registrationNumber: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;

  // STEP 3
  fullName: string;
  email: string;
  adminPhone: string;
  designation: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

interface CommonStepProps {
  formData: CompanyFormData;
  errors: Partial<Record<keyof CompanyFormData, string>>;
  updateForm: (field: keyof CompanyFormData, value: string) => void;
}

export type { CommonStepProps, CompanyFormData };
