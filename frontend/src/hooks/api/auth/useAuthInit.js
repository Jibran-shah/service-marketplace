import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "../../../services/auth/auth.service";
import { queryKeys } from "../../../utils/queryKeys";
import { login, setUser } from "../../../store/slices/auth.slice";
import { setAuthLoading } from "../../../store/slices/ui.slice";
import { setAuthReady } from "../../../store/slices/auth.slice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => await getMe(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(setAuthLoading(meQuery.isLoading));
  }, [meQuery.isLoading, dispatch]);

  useEffect(() => {
    if (meQuery.data?.data?.user) {
      const user = meQuery.data?.data?.user
      if(user.isEmailVerified && user.profile){
        dispatch(login(user))
      }
      dispatch(setUser(user));
    }
  }, [meQuery.data, dispatch]);

  useEffect(() => {
    if (meQuery.isError) {
      dispatch(setUser(null));
    }
  }, [meQuery.isError, dispatch]);

  // 🔥 CRITICAL FIX (this stops login loop)
  useEffect(() => {
    if (!meQuery.isLoading) {
      dispatch(setAuthReady(true));
    }
  }, [meQuery.isLoading, dispatch]);
};