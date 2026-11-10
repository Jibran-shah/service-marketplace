import { useQuery } from "@tanstack/react-query";
import { getMediaAssetById } from "../../../services/media/media.service";


export const useMediaAssetById = (id) => {
  console.log(id)
  return useQuery({
    queryKey: ["media-asset", id],
    queryFn: async () => {
      const res = await getMediaAssetById(id);
      console.log(res);
      return res.mediaAsset;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};