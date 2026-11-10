import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/queryKeys";
import {
  createProvider,
  deleteProvider,
  getProviderById,
  getProviders,
  updateProviderByUser,
  bulkDeleteProviders,
  getProviderByUser
} from "../../../services/provider/provider.service";
import { useDispatch } from "react-redux"
import { login } from "../../../store/slices/auth.slice";


export const useBulkDeleteProviders = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteProviders,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.provider.all
      });
    }
  });
};

export const useCreateProvider = () => {
  const dispatch = useDispatch()
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProvider,
    onSuccess: (data) => {
      dispatch(login(data.user));
      qc.invalidateQueries({
        queryKey: queryKeys.provider.me()
      });
      qc.invalidateQueries({
        queryKey: queryKeys.profile.fullProfile(data.user.id)
      });
    }
  });
};

export const useDeleteProvider = () => {
  const dispatch = useDispatch()
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProvider,
    onSuccess: (data) => {
      dispatch(login(data.user));
      qc.invalidateQueries({
        queryKey: queryKeys.provider.all
      });
    }
  });
};

export const useMyProvider = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.provider.me(),
    queryFn: async () => await getProviderByUser(),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProvider = (id) => {
  return useQuery({
    queryKey: queryKeys.provider.detail(id),
    queryFn: async () => await getProviderById(id),
    enabled: !!id,
  });
};

export const useProviders = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.provider.list(filters),
    queryFn: async () => await getProviders(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateProviderByUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProviderByUser,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.provider.me()
      });
    }
  });
};