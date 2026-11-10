import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../../../utils/queryKeys";
import * as directChatService  from "../../../services/directChat/directChat.service";

/* -------------------- BLOCK USER -------------------- */
export const useBlockDirectChatUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => await directChatService.blockUser(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.directChat.all,
      });
    }
  });
};

/* -------------------- CREATE CHAT -------------------- */
export const useCreateDirectChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await directChatService.createDirectChat({userId:id}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.directChat.all,
      });
    }
  });
};

/* -------------------- DELETE CHAT -------------------- */
export const useDeleteDirectChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chatId) => {
      const res = await directChatService.deleteDirectChatForUser(chatId);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.directChat.all,
      });
    },

    onError: (err) => {
      console.error("[useDeleteDirectChat] error", err);
    },
  });
};

/* -------------------- GET SINGLE CHAT -------------------- */
export const useGetDirectChat = (chatId) => {
  return useQuery({
    queryKey: queryKeys.directChat.detail(chatId),

    queryFn: async () => {
      const res = await directChatService.getDirectChat(chatId);
      return res;
    },

    enabled: !!chatId,

    onError: (err) => {
      console.error("[useGetDirectChat] error", err);
    },
  });
};

/* -------------------- GET USER CHATS -------------------- */
export const useGetUserDirectChats = () => {
  return useQuery({
    queryKey: queryKeys.directChat.list(),

    queryFn: async () => {
      const res = await directChatService.getUserDirectChats();
      return res;
    },

    onError: (err) => {
      console.error("[useGetUserDirectChats] error", err);
    },
  });
};

/* -------------------- UNBLOCK USER -------------------- */
export const useUnblockDirectChatUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await directChatService.unblockUser(payload);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.directChat.all,
      });
    },

    onError: (err) => {
      console.error("[useUnblockDirectChatUser] error", err);
    },
  });
};