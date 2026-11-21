import axios, { AxiosError } from "axios";

import { UninterceptedApiError } from "@/types/api";

export const baseURL =
  process.env.NEXT_PUBLIC_RUN_MODE === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.defaults.withCredentials = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // Normalize API error message
    if (error.response?.data?.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === "string"
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }

    return Promise.reject(error);
  },
);

export default api;
