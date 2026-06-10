import axios from "../../config/axios";
import env from "../../config/env";
import type { CompanyFormData } from "./companySetup.types";

class CompanySetupService {
  private readonly axiosInstance: axios;

  constructor() {
    this.axiosInstance = axios.create(env.API_URL);
  }

  async registerCompany(data: CompanyFormData) {
    return this.axiosInstance.post("/auth/register", data);
  }
}

export default new CompanySetupService();
