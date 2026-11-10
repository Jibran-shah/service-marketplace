import { apiClient } from "../apiClient";

/* =========================
   GET MY WALLET
========================= */
export const getMyWallet = () => {
  return apiClient.get("/wallet/me");
};

/* =========================
   GET MY WALLET TRANSACTIONS
========================= */
export const getMyWalletTransactions = (params) => {
  return apiClient.get("/wallet-transactions", { params });
};

/* =========================
   GET SINGLE TRANSACTION
========================= */
export const getWalletTransactionById = (transactionId) => {
  return apiClient.get(`/wallet-transactions/${transactionId}`);
};

/* =========================
   CREATE MANUAL TRANSACTION (ADMIN ONLY)
========================= */
export const createManualTransaction = (data) => {
  return apiClient.post("/wallet-transactions/admin/manual", data);
};