import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  getCategoryTree,
  createCategory,
  deleteCategory,
  updateCategory
} from "../../../services/categories/categories.service";
import { queryKeys } from "../../../utils/queryKeys";

export const useCategories = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: async () => {
      const res = await getCategories(params);
      return res;
    },
    select: (res) => {
      const data = res?.data?.data;
      return data;
    },
    staleTime: 1000 * 60 * 5
  });
};

export const useCategory = (id, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: async () => {
      const res = await getCategoryById(id);
      return res;
    },
    enabled: !!id && enabled,
    select: (res) => {
      const data = res?.data?.data;
      return data;
    }
  });
};


export const useCategoryTree = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.categories.tree(params),
    queryFn: async () => {
      const res = await getCategoryTree(params);
      return res.tree;
    },
    staleTime: 1000 * 60 * 10
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.all
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.all
      });
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.all
      });
    }
  });
};