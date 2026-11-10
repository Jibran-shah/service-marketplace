import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../../../utils/queryKeys";
import {
  createReview,
  deleteReview,
  getEntityReviews,
  getMyReviews,
  getAllReviews,
  updateReview,
} from "../../../services/reviews/reviews.service";

/* -------------------- CREATE REVIEW -------------------- */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useCreateReview] start:", payload);

      const res = await createReview(payload);

      console.log("[useCreateReview] response:", res);

      return res;
    },

    onSuccess: (data, variables) => {
      console.log("[useCreateReview] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.my(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.entity(
          variables.entityType,
          variables.entityId
        ),
      });

      console.log("[useCreateReview] cache invalidated");
    },

    onError: (err) => {
      console.error("[useCreateReview] error:", err);
    },
  });
};

/* -------------------- DELETE REVIEW -------------------- */
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      console.log("[useDeleteReview] start:", id);

      const res = await deleteReview(id);

      console.log("[useDeleteReview] response:", res);

      return res;
    },

    onSuccess: (data, id) => {
      console.log("[useDeleteReview] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.my(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.detail(id),
      });

      console.log("[useDeleteReview] cache invalidated");
    },

    onError: (err) => {
      console.error("[useDeleteReview] error:", err);
    },
  });
};

/* -------------------- UPDATE REVIEW -------------------- */
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      console.log("[useUpdateReview] start:", { id, data });

      const res = await updateReview(id, data);

      console.log("[useUpdateReview] response:", res);

      return res;
    },

    onSuccess: (data, { id }) => {
      console.log("[useUpdateReview] success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.my(),
      });

      console.log("[useUpdateReview] cache invalidated");
    },

    onError: (err) => {
      console.error("[useUpdateReview] error:", err);
    },
  });
};

/* -------------------- ENTITY REVIEWS -------------------- */
export const useEntityReviews = (entityType, entityId, filters = {}) => {
  return useQuery({
    queryKey: queryKeys.reviews.entity(entityType, entityId, filters),
    queryFn: async () => {
      const res = await getEntityReviews(entityType, entityId, filters);
      console.log(res);
      return res.data;
    },

    enabled: !!entityType && !!entityId,

    onError: (err) => {
      console.error("[useEntityReviews] error:", err);
    },
  });
};

/* -------------------- MY REVIEWS -------------------- */
export const useMyReviews = () => {
  return useQuery({
    queryKey: queryKeys.reviews.my(),

    queryFn: async () => {
      console.log("[useMyReviews] fetching...");

      const res = await getMyReviews();

      console.log("[useMyReviews] response:", res);
      console.log("[useMyReviews] data:", res?.data);

      return res;
    },

    onError: (err) => {
      console.error("[useMyReviews] error:", err);
    },
  });
};

/* -------------------- ALL REVIEWS -------------------- */
export const useReviews = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.reviews.list(filters),

    queryFn: async () => {
      console.log("[useReviews] fetching:", filters);

      const res = await getAllReviews(filters);

      console.log("[useReviews] response:", res);
      console.log("[useReviews] data:", res?.data);

      return res;
    },

    onError: (err) => {
      console.error("[useReviews] error:", err);
    },
  });
};