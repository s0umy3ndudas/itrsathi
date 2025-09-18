// src/api/client.ts
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const apiClient = (queryClient) => {
  const instance = axios.create({
    baseURL: "http://localhost:5001/api",
  });

  instance.interceptors.request.use((config) => {
    const auth = queryClient.getQueryData<{ accessToken: string }>(["auth"]);
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  });

  return instance;
};