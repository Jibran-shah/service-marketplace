import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  getMyProfile,
  getProfileById,
  createProfile,
  deleteProfile,
  getFullProfile,
  updateProfile
} from "../../../services/profile/profile.service";
import { login, logout } from "../../../store/slices/auth.slice";
import { queryKeys } from "../../../utils/queryKeys";
import { store } from "../../../store/store";

export const useProfile = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.profile.buyer.me(),
    queryFn: async () => await getMyProfile(),
    enabled: options.enabled
  });
};

export const useProfileById = (id) => {
  return useQuery({
    queryKey: queryKeys.profile.buyer.byId(id),
    queryFn: async () => await getProfileById(id),
    enabled: !!id
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {  
       dispatch(login(data?.user));
      queryClient.invalidateQueries({
        queryKey: ["profile", "me"]
      });
    }
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      dispatch(logout());
      queryClient.removeQueries({
        queryKey: ["profile", "me"]
      });
    }
  });
};


export const useGetFullProfile = (id) => {
  return useQuery({
    queryKey: queryKeys.profile.fullProfile(id),
    queryFn: async () => await getFullProfile(id),
    enabled: !!id
  });
};


export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      const user = store.getState().auth.user;
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.fullProfile(user.id||user._id)
      });
    }
  });
};