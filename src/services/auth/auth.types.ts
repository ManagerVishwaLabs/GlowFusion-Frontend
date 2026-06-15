import type { ApiResponse } from "../../config/axios";
interface RegisterCompanyResponse extends ApiResponse<unknown> {
  success: boolean;
  message?: string;
  code?: string;
  data?: {
    company: {
      _id: string;
      company: string;
      companyName: string;
      contactEmail: string;
      companySize: string;
      aboutCompany?: string;
      country?: string;
      socialMedia?: string[];
      address?: string;
      foundedYear?: string;
      contactPhone?: string;
      pincode?: string;
      registrationNumber?: string;
      visionMission?: string;
      website?: string;
      companyLogoUrl?: string;
      industry?: string;
    };
    user: {
      _id: string;
      fullName: string;
      lastName?: string;
      username: string;
      company: string;
      email: string;
      designation?: string;
      phoneNumber?: string;
      userRole?: string;
    };
  };
}

interface LoginFormData {
  username: string;
  password: string;
}
interface LoginResponse extends ApiResponse<unknown> {
  success: boolean;
  message?: string;
  code?: string;
  data?: {
    user: {
      _id: string;
      fullName: string;
      lastName?: string;
      username: string;
      company: string;
      email: string;
      designation?: string;
      phoneNumber?: string;
      userRole?: string;
    };
  };
}
export type { LoginFormData, LoginResponse, RegisterCompanyResponse };
