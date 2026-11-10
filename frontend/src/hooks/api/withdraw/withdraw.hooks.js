import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../../../utils/queryKeys";

import {
  createWithdrawRequest,
  getMyWithdrawRequests,
  updateWithdrawRequestStatus,
  getWithdrawRequestById,
} from "../../../services/withdraw/withdraw.service";


export const useCreateWithdrawRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWithdrawRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.withdraw.all,
      });
    }
  });
};

export const useMyWithdrawRequests = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.withdraw.my(),
    queryFn: async () => await getMyWithdrawRequests(params),
    staleTime: 1000 * 60 * 2
  });
};

/* -------------------- UPDATE WITHDRAW STATUS -------------------- */
export const useUpdateWithdrawStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWithdrawRequestStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.withdraw.all,
      });
    },
  });
};

export const useWithdrawRequest = (id, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.withdraw.detail(id),
    enabled: !!id && enabled,
    queryFn: async () => await getWithdrawRequestById(id),
  });
};