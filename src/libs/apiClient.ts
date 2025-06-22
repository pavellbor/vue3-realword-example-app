import axios, { AxiosError } from "axios";
import { API_URL, TOKEN_KEY } from "../constants/api";

export class ApiError extends Error {
  constructor(public errors: Record<string, string[]>) {
    super("API Error");
  }
}

export class ApiClient {
  constructor() {
    axios.defaults.baseURL = API_URL;

    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    });

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
        }
        throw error;
      }
    );
  }

  protected async get<T>(path: string): Promise<T> {
    try {
      const { data } = await axios.get<T>(path);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error.response?.data.errors);
      }
      throw error;
    }
  }

  protected async post<T>(path: string, data: any): Promise<T> {
    try {
      const { data: responseData } = await axios.post<T>(path, data);
      return responseData;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error.response?.data.errors);
      }
      throw error;
    }
  }
}
