import { apiClient } from "../apiClient";

/* =========================
   CREATE REVIEW
========================= */
export const createReview = (data) =>
  apiClient.post("/reviews", data);

/* =========================
   GET MY REVIEWS
========================= */
export const getMyReviews = () =>
  apiClient.get("/reviews/me");

/* =========================
   GET ALL REVIEWS
========================= */
export const getAllReviews = (params) =>
  apiClient.get("/reviews", { params });

/* =========================
   GET SINGLE REVIEW
========================= */
export const getReviewById = (id) =>
  apiClient.get(`/reviews/${id}`);

/* =========================
   GET ENTITY REVIEWS
========================= */
export const getEntityReviews = (entityType, entityId, params) =>
  apiClient.get(
    `/reviews/entity/${entityType}/${entityId}`,
    { params }
  );

/* =========================
   UPDATE REVIEW
========================= */
export const updateReview = (id, data) =>
  apiClient.patch(`/reviews/${id}`, data);

/* =========================
   DELETE REVIEW
========================= */
export const deleteReview = (id) =>
  apiClient.delete(`/reviews/${id}`);