import { apiClient } from "../apiClient";

export const createProfile = async (data) => {
  const res = await apiClient.post("/profiles/buyers", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data ?? null;
};

export const getMyProfile = async () => {
  const res = await apiClient.get("/profiles/buyers/byUser");
  return res?.data ?? null;
};

export const getFullProfile = async (id) => {
  console.log(id);
  const res = await apiClient.get(`/profiles/buyers/full/${id}`);
  return res?.data ?? null;
};

export const updateProfile = async (data) => {
  const res = await apiClient.put("/profiles/buyers", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data?.data ?? null;
};

export const deleteProfile = async () => {
  const res = await apiClient.delete("/profiles/buyers");
  return res?.data ?? null;
};

export const getProfileById = async (id) => {
  const res = await apiClient.get(`/profiles/buyers/${id}`);
  return res?.data?.data ?? null;
};

export const getProfiles = async (params) => {
  const res = await apiClient.get("/profiles/buyers", { params });
  return res?.data ?? { data: [] };
};