import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/auth/auth.service";
import { queryKeys } from "../../../utils/queryKeys";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: queryKeys.auth.user(id),
    queryFn: async () => await getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
};