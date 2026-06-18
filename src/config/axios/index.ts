import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import authStore from "../../store/auth.store";

type ApiResponse<T = unknown> =
  | {
      success: false;
      message?: string;
      error?: Error;
      code?: string;
    }
  | {
      success: true;
      data: T;
      message?: string;
      error?: Error;
      code?: string;
    };

class HttpClient {
  private readonly client: AxiosInstance;

  private static shared: HttpClient | null = null;

  private static getShared(): HttpClient {
    if (!this.shared) {
      this.shared = new HttpClient();
    }
    return this.shared;
  }

  private refreshing = false;
  private waitingQueue: (() => void)[] = [];

  private setupInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use((config) => {
      console.log("\n🚀 REQUEST:", {
        baseURL: config.baseURL,
        data:
          config.data instanceof URLSearchParams
            ? config.data.toString()
            : config.data,
        method: config.method,
        url: config.url,
      });

      const token = authStore.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    instance.interceptors.response.use(
      (res) => {
        console.log("\n✅ RESPONSE:", res.status);
        return res;
      },

      async (err) => {
        console.log("\n❌ ERROR RESPONSE");
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);

        if (err.config) {
          console.log("\n🔥 FAILED REQUEST:", {
            data: err.config.data,
            method: err.config.method,
            url: err.config.url,
          });
        }

        const original = err.config;

        if (
          err.response?.status !== 401 ||
          original?.url.includes("/refresh") ||
          original?.url.includes("/login")
        ) {
          return Promise.reject(err);
        }

        if (original?._retry) {
          authStore.clear();
          const redirect = window.location.href;
          window.location.href =
            "/login?redirect=" + encodeURIComponent(redirect);
          return Promise.reject(new Error("Redirect to login"));
        }

        original._retry = true;

        try {
          if (this.refreshing) {
            return new Promise((resolve) => {
              this.waitingQueue.push(() => resolve(instance(original)));
            });
          }

          this.refreshing = true;
          const refresh = await instance.post(
            "/auth/refresh",
            {},
            {
              withCredentials: true,
            },
          );

          const token = refresh.data?.data?.accessToken;

          if (!token) {
            throw new Error("Refresh failed");
          }

          authStore.setAccessToken(token);

          this.waitingQueue.forEach((cb) => cb());

          this.waitingQueue = [];
          original.headers.Authorization = `Bearer ${token}`;

          return instance(original);
        } catch (refreshError) {
          authStore.clear();

          this.waitingQueue = [];

          const redirect = window.location.href;

          window.location.href =
            "/login?redirect=" + encodeURIComponent(redirect);

          return Promise.reject(refreshError);
        } finally {
          this.refreshing = false;
        }
      },
    );
  }

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      withCredentials: true,
    });

    this.setupInterceptors(this.client);
  }

  static create(baseURL: string): HttpClient {
    return new HttpClient(baseURL);
  }

  private async request<T>(
    config: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await this.client.request<ApiResponse<T>>(config);
      return res.data;
    } catch (err) {
      console.error("[HTTP Client] Error:", err);

      if (axios.isAxiosError<ApiResponse<T>>(err)) {
        const apiError = err.response?.data;

        return {
          code: apiError?.code,
          error: apiError?.error,
          message: apiError?.message ?? err.message,
          success: false,
        };
      }

      return {
        message: err instanceof Error ? err.message : "Unknown error",
        success: false,
      };
    }
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      method: "GET",
      url,
    });
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      data,
      method: "POST",
      url,
    });
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      data,
      method: "PUT",
      url,
    });
  }

  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      data,
      method: "PATCH",
      url,
    });
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      method: "DELETE",
      url,
    });
  }

  static async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.getShared().get<T>(url, config);
  }

  static async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.getShared().post<T, D>(url, data, config);
  }

  static async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.getShared().put<T, D>(url, data, config);
  }

  static async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.getShared().patch<T, D>(url, data, config);
  }

  static async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.getShared().delete<T>(url, config);
  }
}

export default HttpClient;
export type { ApiResponse, AxiosInstance };
