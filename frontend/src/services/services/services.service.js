import { apiClient } from "../apiClient";

export const createService = async (data) => {
  const res = await apiClient.post("/services", data);
  return res;
};

export const getServices = async (params) => {
  const res = await apiClient.get("/services", {
    params
  });
  return res.data;
};

export const getMyServices = async () => {
  const res = await apiClient.get("/services/me");
  return res.data;
};

export const getServicesByCategory = async (categoryId) => {
  const res = await apiClient.get(`/services/category/${categoryId}`);
  return res.data;
};

export const getServiceById = async (id) => {
  const res = await apiClient.get(`/services/${id}`);
  return res.data;
};

export const updateService = async ({id, data}) => {
  const res = await apiClient.patch(`/services/${id}`, data);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await apiClient.delete(`/services/${id}`);
  return res.data;
};