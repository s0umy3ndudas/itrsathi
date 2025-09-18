// src/hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

export const useAuth = () => {
  const queryClient = useQueryClient();

  const requestOtpMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axios.post(`${API_URL}/request-otp`, { email });
      return res.data;
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async ({ email, otp }) => {
      const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], {
        user: data.user,
        accessToken: data.accessToken,
      });
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: data.user, accessToken: data.accessToken })
      );
    },
  });

  const storedAuth = localStorage.getItem("auth");
  const auth = storedAuth
    ? JSON.parse(storedAuth)
    : queryClient.getQueryData(["auth"]);

  return {
    requestOtp: requestOtpMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    isRequestingOtp: requestOtpMutation.isLoading,
    isVerifyingOtp: verifyOtpMutation.isLoading,
    user: auth?.user,
    token: auth?.accessToken,
    logout: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
      localStorage.removeItem("auth");
    },
  };
};