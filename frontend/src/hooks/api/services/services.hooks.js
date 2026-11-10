import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createService,
  getServices,
  getMyServices,
  getServiceById,
  updateService,
  deleteService
} from "../../../services/services/services.service";

import { queryKeys } from "../../../utils/queryKeys";


export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      console.log("[useCreateService] payload:", data);
      return createService(data);
    },

    onSuccess: (data) => {
      console.log("[useCreateService] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.services.all
      });
    },

    onError: (error) => {
      console.error("[useCreateService] error:", error);
    }
  });
};


export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      console.log("[useDeleteService] id:", id);
      return deleteService(id);
    },

    onSuccess: (data) => {
      console.log("[useDeleteService] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.services.all
      });
    },

    onError: (error) => {
      console.error("[useDeleteService] error:", error);
    }
  });
};


export const useMyServices = () => {
  return useQuery({
    queryKey: queryKeys.services.my(),

    queryFn: async () => {
      console.log("[useMyServices] fetching...");

      const res = await getMyServices();

      console.log("[useMyServices] response:", res);

      return res;
    },

    select: (res) => {
      console.log("[useMyServices] selected:", res?.data);
      return res.data;
    }
  });
};

export const useService = (id) => {
  return useQuery({
    queryKey: queryKeys.services.detail(id),
    queryFn: async () => await getServiceById(id),
    enabled: !!id,
  });
};


export const useServices = ( filters = {}, enabled = true ) => {
  return useQuery({
    queryKey: queryKeys.services.list(filters),
    queryFn: async () => await getServices(filters),
    staleTime: 5 * 60 * 1000,
    enabled
  });
};


export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      console.log("[useUpdateService] payload:", payload);
      return updateService(payload);
    },
    onSuccess: (data, variables) => {
      console.log("[useUpdateService] success:", data);
      console.log("[useUpdateService] variables:", variables);
      queryClient.invalidateQueries({
        queryKey: queryKeys.services.all
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.services.detail(variables.id)
      });
    },
    onError: (error) => {
      console.error("[useUpdateService] error:", error);
    }
  });
};