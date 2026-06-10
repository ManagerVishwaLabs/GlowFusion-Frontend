type CompanyFormData = {
  // STEP 1
  companyName: string;
  companyEmail: string;
  contactPhone: string;
  website: string;
  industry: string;
  companySize: string;
  country: string;
  address: string;
  pincode: string;
  companyLogoUrl: string;

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
  userEmail: string;
  adminPhone: string;
  designation: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export type { CompanyFormData };
