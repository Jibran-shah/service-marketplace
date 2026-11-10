import { apiClient } from "../apiClient";

export const createProvider = async (data) => {
  const res = await apiClient.post("/providers", data);
  return res?.data ?? null;
};

export const getProviders = async (params) => {
  const res = await apiClient.get("/providers", { params });
  return res?.data ?? [];
};

export const getProviderById = async (id) => {
  const res = await apiClient.get(`/providers/${id}`);
  return res.data ?? null;
};

export const getProviderByUser = async () => {
  const res = await apiClient.get(`/providers/byUser`);
  console.log(res.data)
  return res.data ?? null;
};

export const updateProviderByUser = async (data) => {
  const res = await apiClient.put("/providers/byUser",data);
  return res?.data;
};

export const updateProvider = async ({ id, data }) => {
  const res = await apiClient.put(`/service-providers/${id}`,data);
  return res?.data ?? null;
};

export const deleteProvider = async () => {
  const res = await apiClient.delete("/providers");
  return res?.data ?? null;
};

export const bulkDeleteProviders = async (ids) => {
  const res = await apiClient.post("/providers/bulk-delete",{ ids })
  return res?.data ?? null;
};