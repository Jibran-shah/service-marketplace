import { apiClient } from "../apiClient";


export const getMediaAssetById = (id) =>
  apiClient.get(`/media/assets/${id}`);