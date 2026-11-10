import { apiClient } from "../apiClient";

// CREATE WITHDRAW REQUEST
export const createWithdrawRequest = (data) =>
  apiClient.post("/withdraw-requests", data);

// GET MY REQUESTS
export const getMyWithdrawRequests = (params) =>
  apiClient.get("/withdraw-requests/my", { params });

// GET SINGLE REQUEST
export const getWithdrawRequestById = (id) =>
  apiClient.get(`/withdraw-requests/${id}`);

// UPDATE STATUS (ADMIN)
export const updateWithdrawRequestStatus = (id, data) =>
  apiClient.patch(`/withdraw-requests/${id}/status`, data);