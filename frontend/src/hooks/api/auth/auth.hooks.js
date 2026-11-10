import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { logout } from "../../../services/auth/auth.service";
import { setAuthenticated, setUser } from "../../../store/slices/auth.slice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      // 1. reset redux auth state
      dispatch(setAuthenticated(false));
      dispatch(setUser(null));

      // 2. clear all cached server state
      queryClient.clear();
    },

    onError: (error) => {
  
    }
  });
};