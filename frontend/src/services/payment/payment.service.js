import { apiClient } from "../apiClient";

/* =========================
   CREATE PAYMENT TRANSACTION
========================= */
export const createPaymentTransaction = (data) =>
  apiClient.post("/payments", data);

/* =========================
   GET MY TRANSACTIONS
========================= */
export const getMyPaymentTransactions = (params) =>
  apiClient.get("/payments/my", { params });

/* =========================
   GET SINGLE TRANSACTION
========================= */
export const getPaymentTransactionById = (transactionId) =>
  apiClient.get(`/payments/${transactionId}`);

/* =========================
   REFUND TRANSACTION (ADMIN ONLY)
========================= */
export const refundPayment = (transactionId) =>
  apiClient.patch(`/payments/${transactionId}/refund`);