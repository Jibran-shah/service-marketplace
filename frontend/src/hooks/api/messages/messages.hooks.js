import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/queryKeys";
import { messagesService } from "../../../services/messages/messages.service";

/* -------------------- DELETE MESSAGE -------------------- */
export const useDeleteMessage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (messageId) => {
      console.log("[useDeleteMessage] start:", messageId);

      const res = await messagesService.deleteMessage(messageId);

      console.log("[useDeleteMessage] response:", res);

      return res;
    },

    onSuccess: (data) => {
      console.log("[useDeleteMessage] success:", data);

      qc.invalidateQueries({
        queryKey: queryKeys.messages.all,
      });

      console.log("[useDeleteMessage] cache invalidated");
    },

    onError: (err) => {
      console.error("[useDeleteMessage] error:", err);
    },
  });
};

/* -------------------- EDIT MESSAGE -------------------- */
export const useEditMessage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useEditMessage] start:", payload);

      const res = await messagesService.editMessage(payload);

      console.log("[useEditMessage] response:", res);

      return res;
    },

    onSuccess: (data) => {
      console.log("[useEditMessage] success:", data);

      qc.invalidateQueries({
        queryKey: queryKeys.messages.all,
      });

      console.log("[useEditMessage] cache invalidated");
    },

    onError: (err) => {
      console.error("[useEditMessage] error:", err);
    },
  });
};

/* -------------------- MARK MESSAGE DELIVERED -------------------- */
export const useMarkMessageAsDelivered = () => {
  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useMarkMessageAsDelivered] start:", payload);

      const res = await messagesService.markMessageAsDelivered(payload);

      console.log("[useMarkMessageAsDelivered] response:", res);

      return res;
    },

    onError: (err) => {
      console.error("[useMarkMessageAsDelivered] error:", err);
    },
  });
};

/* -------------------- MARK CHAT DELIVERED -------------------- */
export const useMarkChatAsDelivered = () => {
  return useMutation({
    mutationFn: async (chatId) => {
      console.log("[useMarkChatAsDelivered] start:", chatId);

      const res = await messagesService.markChatAsDelivered(chatId);

      console.log("[useMarkChatAsDelivered] response:", res);

      return res;
    },

    onError: (err) => {
      console.error("[useMarkChatAsDelivered] error:", err);
    },
  });
};

/* -------------------- MARK CHAT READ -------------------- */
export const useMarkChatAsRead = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (chatId) => {
      console.log("[useMarkChatAsRead] start:", chatId);

      const res = await messagesService.markChatAsRead(chatId);

      console.log("[useMarkChatAsRead] response:", res);

      return res;
    },

    onSuccess: (data) => {
      console.log("[useMarkChatAsRead] success:", data);

      qc.invalidateQueries({
        queryKey: queryKeys.messages.all,
      });

      console.log("[useMarkChatAsRead] cache invalidated");
    },

    onError: (err) => {
      console.error("[useMarkChatAsRead] error:", err);
    },
  });
};

/* -------------------- MARK CHAT READ UP TO -------------------- */
export const useMarkChatAsReadUpTo = () => {
  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useMarkChatAsReadUpTo] start:", payload);

      const res = await messagesService.markChatAsReadUpTo(payload);

      console.log("[useMarkChatAsReadUpTo] response:", res);

      return res;
    },

    onError: (err) => {
      console.error("[useMarkChatAsReadUpTo] error:", err);
    },
  });
};

/* -------------------- MARK MESSAGE READ -------------------- */
export const useMarkMessageAsRead = () => {
  return useMutation({
    mutationFn: async (messageId) => {
      console.log("[useMarkMessageAsRead] start:", messageId);

      const res = await messagesService.markMessageAsRead(messageId);

      console.log("[useMarkMessageAsRead] response:", res);

      return res;
    },

    onError: (err) => {
      console.error("[useMarkMessageAsRead] error:", err);
    },
  });
};

/* -------------------- GET CHAT MESSAGES -------------------- */
export const useGetChatMessages = (chatId, params = {}) => {
  return useQuery({
    queryKey: queryKeys.messages.chat(chatId),

    queryFn: async () => {
      console.log("[useGetChatMessages] fetching chatId:", chatId, params);

      const res = await messagesService.getChatMessages({
        chatId,
        ...params,
      });

      console.log("[useGetChatMessages] response:", res);
      console.log("[useGetChatMessages] data:", res?.data);

      return res;
    },

    enabled: !!chatId,

    onError: (err) => {
      console.error("[useGetChatMessages] error:", err);
    },
  });
};

/* -------------------- SEND MESSAGE -------------------- */
export const useSendMessage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("[useSendMessage] start:", payload);

      const res = await messagesService.sendMessage(payload);

      console.log("[useSendMessage] response:", res);

      return res;
    },

    onSuccess: (data, vars) => {
      console.log("[useSendMessage] success:", data);

      qc.invalidateQueries({
        queryKey: queryKeys.messages.chat(vars.chatId),
      });

      console.log("[useSendMessage] chat invalidated:", vars.chatId);
    },

    onError: (err) => {
      console.error("[useSendMessage] error:", err);
    },
  });
};




export const useGetChatMessagesInfinite = (chatId, params = {}) => {
  return useInfiniteQuery({
    queryKey: queryKeys.messages.chat(chatId),

    enabled: !!chatId,

    queryFn: async ({ pageParam = 1 }) => {
      const res = await messagesService.getChatMessages({
        chatId,
        page: pageParam,
        limit: params.limit || 20,
      });

      return res; // { messages, meta }
    },

    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;

      if (!meta) return undefined;
      if (meta.page >= meta.totalPages) return undefined;

      return meta.page + 1;
    },
    initialPageParam: 1,
  });
};