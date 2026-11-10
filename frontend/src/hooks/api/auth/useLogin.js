import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/auth/auth.service";
import { queryKeys } from "../../../utils/queryKeys";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me()
      });
    },
  });
};