import { apiClient } from "../apiClient";

export const register = async (data) => {
  const res = await apiClient.post("/auth/register", data);
  console.log(res);
  return res;
};

export const login = async (data) => {
  return await apiClient.post("/auth/login", data);
};

export const logout = async () => {
  return await apiClient.post("/auth/logout");
};

export const logoutAll = async () => {
  return await apiClient.post("/auth/logout-all");
};

export const refreshToken = async () => {
  return await apiClient.get("/auth/refresh-token");
};

export const getMe = async () => {
  return await apiClient.get("/auth/me");
};

export const forgotPassword = async (data) => {
  return await apiClient.post("/auth/forgot-password", data);
};

export const verifyResetOtp = async (data) => {
  return await apiClient.post("/auth/verify-reset-otp", data);
};

export const resetPassword = async (data) => {
  return await apiClient.post("/auth/reset-password", data);
};

export const resendResetOtp = async (data) => {
  return await apiClient.post("/auth/resend-reset-otp", data);
};

export const verifyEmail = async (query) => {
  return await apiClient.get("/auth/verify-email", {
    params: query,
  });
};

export const getUserById = async (id) => {
  return await apiClient.get(`/auth/${id}`);
};

export const resendVerifyEmail = async (data) => {
  return await apiClient.post("/auth/resend-verify-email", data);
};