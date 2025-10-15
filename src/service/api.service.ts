
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService { 
    private axiosInstance: AxiosInstance;
    private token: string | null = null;

    constructor() {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000, 
            headers: {
                "Content-Type": "application/json",
            }
        });

        this.axiosInstance.interceptors.request.use(
            async (config) => {
                if (!this.token && typeof window !== "undefined") {
                    await this.setTokenFromCookie();
                }
                
                if (this.token) {
                    config.headers.Authorization = `Bearer ${this.token}`;
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Token expirado ou inválido
                    this.token = null;
                    if (typeof window !== "undefined") {
                        console.error("Unauthorized - Token inválido");
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    private async setTokenFromCookie(): Promise<void> {
        try {
            const cookie: { value?: string } | undefined | null =
                await cookieStore.get("auth_token");
            this.token = cookie?.value || null;
        } catch (error) {
            console.error("Erro ao buscar token do cookie:", error);
            this.token = null;
        }
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public clearToken(): void {
        this.token = null;
    }

    // Métodos HTTP

    public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, config);
        return response.data;
    }

    public async post<T>(
        endpoint: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data, config);
        return response.data;
    }

    public async put<T>(
        endpoint: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, data, config);
        return response.data;
    }

    public async patch<T>(
        endpoint: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.patch(endpoint, data, config);
        return response.data;
    }

    public async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint, config);
        return response.data;
    }

    public async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    }
}

export const apiService = new ApiService();
export default apiService;