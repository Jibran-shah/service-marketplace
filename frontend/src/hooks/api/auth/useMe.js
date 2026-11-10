import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../../services/auth/auth.service";
import { queryKeys } from "../../../utils/queryKeys";

export const useMe = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => await getMe(),
    enabled,
    retry: false,
    refetchOnWindowFocus: false,

    select: (res) => res?.data?.data?.user || null
  });
};