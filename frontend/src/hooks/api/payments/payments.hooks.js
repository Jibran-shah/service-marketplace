import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../../../queryKeys";
import {
  createPaymentTransaction,
  getPaymentTransactionById,
  getMyPaymentTransactions,
  refundPayment,
} from "../../../api/payments/payments.api";

/* -------------------- CREATE PAYMENT -------------------- */
export const useCreatePaymentTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useCreatePaymentTransaction] start:", payload);

      const res = await createPaymentTransaction(payload);

      console.log("[useCreatePaymentTransaction] response:", res);

      return res;
    },

    onSuccess: (data) => {
      console.log("[useCreatePaymentTransaction] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.list(),
      });

      console.log("[useCreatePaymentTransaction] list invalidated");
    },

    onError: (err) => {
      console.error("[useCreatePaymentTransaction] error:", err);
    },
  });
};

/* -------------------- GET SINGLE PAYMENT -------------------- */
export const usePaymentTransaction = (id) => {
  return useQuery({
    queryKey: queryKeys.payments.detail(id),
    enabled: !!id,

    queryFn: async () => {
      console.log("[usePaymentTransaction] fetching id:", id);

      const res = await getPaymentTransactionById(id);

      console.log("[usePaymentTransaction] response:", res);
      console.log("[usePaymentTransaction] data:", res?.data);

      return res;
    },

    onError: (err) => {
      console.error("[usePaymentTransaction] error:", err);
    },
  });
};

/* -------------------- MY PAYMENTS LIST -------------------- */
export const useMyPaymentTransactions = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.payments.list(filters),

    queryFn: async () => {
      console.log("[useMyPaymentTransactions] fetching:", filters);

      const res = await getMyPaymentTransactions(filters);

      console.log("[useMyPaymentTransactions] response:", res);
      console.log("[useMyPaymentTransactions] data:", res?.data);

      return res;
    },

    onError: (err) => {
      console.error("[useMyPaymentTransactions] error:", err);
    },
  });
};

/* -------------------- REFUND PAYMENT -------------------- */
export const useRefundPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId) => {
      console.log("[useRefundPayment] start:", transactionId);

      const res = await refundPayment(transactionId);

      console.log("[useRefundPayment] response:", res);

      return res;
    },

    onSuccess: (data, transactionId) => {
      console.log("[useRefundPayment] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.list(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.detail(transactionId),
      });

      console.log("[useRefundPayment] cache invalidated");
    },

    onError: (err) => {
      console.error("[useRefundPayment] error:", err);
    },
  });
};