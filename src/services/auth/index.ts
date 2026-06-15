import axios from "../../config/axios";
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
    this.axiosInstance = axios.create(env.API_URL + "auth");
  }

  async registerCompanyUser(
    data: CompanyFormData,
  ): Promise<RegisterCompanyResponse> {
    const response = await this.axiosInstance.post<RegisterCompanyResponse>(
      "/register",
      data,
    );
    if (response.success && response.data) {
      return response.data;
    } else {
      return {
        message: response.message,
        success: false,
      };
    }
  }
  async loginUser(data: LoginFormData): Promise<LoginResponse> {
    const response = await this.axiosInstance.post<LoginResponse>(
      "/login",
      data,
    );

    if (response.success && response.data) {
      return response.data;
    } else {
      return {
        code: response.code,
        message: response.message,
        success: false,
      };
    }
  }
}

export default new AuthService();
