import axios, { type ApiResponse } from "../../config/axios";
import env from "../../config/env";
import type { CompanyFormData } from "../../pages/CompanySetup/companySetup.types";
import type {
  LoginFormData,
  LoginResponse,
  RegisterCompanyResponse,
} from "./auth.types";

class AuthService {
  private readonly axiosInstance: axios;

  constructor() {
    this.axiosInstance = axios.create(env.API_URL + "/auth");
  }

  async registerCompanyUser(
    data: CompanyFormData,
  ): Promise<ApiResponse<RegisterCompanyResponse>> {
    const response = await this.axiosInstance.post<RegisterCompanyResponse>(
      "/register",
      data,
    );
    if (response.success) {
      return {
        data: response.data,
        success: true,
      };
    } else {
      return {
        message: response.message,
        success: false,
      };
    }
  }

  async loginUser(data: LoginFormData): Promise<ApiResponse<LoginResponse>> {
    const response = await this.axiosInstance.post<LoginResponse>(
      "/login",
      data,
    );

    if (response.success) {
      return {
        data: response.data,
        success: true,
      };
    } else {
      return {
        code: response.code,
        message: response.message,
        success: false,
      };
    }
  }

  async logoutUser(): Promise<boolean> {
    const response = await this.axiosInstance.post("/logout", {});

    return response.success;
  }
}

export default new AuthService();
