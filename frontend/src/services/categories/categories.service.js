import { apiClient } from "../apiClient";

/* ======================
   CREATE CATEGORY
====================== */
export const createCategory = (data) => {
  console.log("[createCategory] request:", data);

  return apiClient
    .post("/categories", data)
    .then((res) => {
      console.log("[createCategory] response:", res);
      console.log("[createCategory] data:", res.data);
      return res;
    })
    .catch((err) => {
      console.error("[createCategory] error:", err);
      throw err;
    });
};

/* ======================
   GET ALL CATEGORIES
====================== */
export const getCategories = (params) => {
  console.log("[getCategories] params:", params);

  return apiClient
    .get("/categories", { params })
    .then((res) => {
      console.log("[getCategories] response:", res);
      console.log("[getCategories] data:", res.data);
      return res;
    })
    .catch((err) => {
      console.error("[getCategories] error:", err);
      throw err;
    });
};

/* ======================
   GET CATEGORY TREE
====================== */
export const getCategoryTree = (params) => {
  console.log("[getCategoryTree] params:", params);

  return apiClient
    .get("/categories/tree", { params })
    .then((res) => {
      console.log("[getCategoryTree] response:", res);
      console.log("[getCategoryTree] data:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("[getCategoryTree] error:", err);
      throw err;
    });
};

/* ======================
   GET BY ID
====================== */
export const getCategoryById = (id) => {
  console.log("[getCategoryById] id:", id);

  return apiClient
    .get(`/categories/${id}`)
    .then((res) => {
      console.log("[getCategoryById] response:", res);
      console.log("[getCategoryById] data:", res.data);
      return res;
    })
    .catch((err) => {
      console.error("[getCategoryById] error:", err);
      throw err;
    });
};

/* ======================
   UPDATE CATEGORY
====================== */
export const updateCategory = (id, data) => {
  console.log("[updateCategory] id:", id);
  console.log("[updateCategory] data:", data);

  return apiClient
    .patch(`/categories/${id}`, data)
    .then((res) => {
      console.log("[updateCategory] response:", res);
      console.log("[updateCategory] data:", res.data);
      return res;
    })
    .catch((err) => {
      console.error("[updateCategory] error:", err);
      throw err;
    });
};

/* ======================
   DELETE CATEGORY
====================== */
export const deleteCategory = (id) => {
  console.log("[deleteCategory] id:", id);

  return apiClient
    .delete(`/categories/${id}`)
    .then((res) => {
      console.log("[deleteCategory] response:", res);
      console.log("[deleteCategory] data:", res.data);
      return res;
    })
    .catch((err) => {
      console.error("[deleteCategory] error:", err);
      throw err;
    });
};