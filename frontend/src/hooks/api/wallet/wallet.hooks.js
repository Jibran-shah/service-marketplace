import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../../../utils/queryKeys";

import {
  createManualTransaction,
  getMyWalletTransactions,
  getWalletTransactionById,
} from "../../../services/wallet/wallet.service";

import { getMyWallet } from "../../../services/wallet/wallet.service";

/* -------------------- CREATE MANUAL TRANSACTION -------------------- */
export const useCreateManualTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useCreateManualTransaction] start:", payload);

      const res = await createManualTransaction(payload);

      console.log("[useCreateManualTransaction] response:", res);

      return res;
    },

    onSuccess: (data) => {
      console.log("[useCreateManualTransaction] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.transactions.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.me(),
      });

      console.log("[useCreateManualTransaction] cache invalidated");
    },

    onError: (err) => {
      console.error("[useCreateManualTransaction] error:", err);
    },
  });
};

/* -------------------- WALLET -------------------- */
export const useWallet = () => {
  return useQuery({
    queryKey: queryKeys.wallet.me(),

    queryFn: async () => {
      console.log("[useWallet] fetching wallet...");

      const res = await getMyWallet();

      console.log("[useWallet] response:", res);
      console.log("[useWallet] data:", res?.data?.data);

      return res;
    },

    select: (res) => {
      console.log("[useWallet] select transform");
      return res.data?.data;
    },

    staleTime: 60 * 1000 * 5, // 5 min cache
    onError: (err) => {
      console.error("[useWallet] error:", err);
    },
  });
};

/* -------------------- WALLET TRANSACTION -------------------- */
export const useWalletTransaction = (id) => {
  return useQuery({
    queryKey: queryKeys.wallet.transactions.detail(id),
    enabled: !!id,

    queryFn: async () => {
      console.log("[useWalletTransaction] fetching id:", id);

      const res = await getWalletTransactionById(id);

      console.log("[useWalletTransaction] response:", res);
      console.log("[useWalletTransaction] data:", res?.data?.data);

      return res;
    },

    select: (res) => {
      console.log("[useWalletTransaction] select transform");
      return res.data?.data;
    },

    onError: (err) => {
      console.error("[useWalletTransaction] error:", err);
    },
  });
};

/* -------------------- WALLET TRANSACTIONS LIST -------------------- */
export const useWalletTransactions = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.wallet.transactions.list(filters),

    queryFn: async () => {
      console.log("[useWalletTransactions] fetching:", filters);

      const res = await getMyWalletTransactions(filters);

      console.log("[useWalletTransactions] response:", res);
      console.log("[useWalletTransactions] data:", res?.data?.data);

      return res;
    },

    select: (res) => {
      console.log("[useWalletTransactions] select transform");
      return res.data?.data;
    },

    staleTime: 2 * 60 * 1000,

    onError: (err) => {
      console.error("[useWalletTransactions] error:", err);
    },
  });
};