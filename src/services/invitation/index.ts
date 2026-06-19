import axios, { type ApiResponse } from "../../config/axios";
import env from "../../config/env";

class InvitationService {
  private readonly axiosInstance: axios;

  constructor() {
    this.axiosInstance = axios.create(env.API_URL + "/invitation");
  }

  async acceptInvite(inviteCode: string): Promise<ApiResponse<boolean>> {
    const response = await this.axiosInstance.post<boolean>(
      `/${inviteCode}/accept`,
      {
        inviteCode,
      },
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
}

export default new InvitationService();
