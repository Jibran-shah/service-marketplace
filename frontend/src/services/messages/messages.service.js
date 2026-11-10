import {apiClient} from "../apiClient";

/* =========================
   API LAYER
========================= */

const messagesApi = {
  getChatMessages: (chatId, params) => {
    console.log("[messagesApi.getChatMessages] chatId:", chatId, "params:", params);
    return apiClient.get(`/messages/chat/${chatId}`, { params });
  },

  sendMessage: (data) => {
    console.log("[messagesApi.sendMessage] data:", data);
    return apiClient.post("/messages", data);
  },

  editMessage: (messageId, data) => {
    console.log("[messagesApi.editMessage] messageId:", messageId, "data:", data);
    return apiClient.patch(`/messages/${messageId}`, data);
  },

  deleteMessage: (messageId) => {
    console.log("[messagesApi.deleteMessage] messageId:", messageId);
    return apiClient.delete(`/messages/${messageId}`);
  },

  markMessageAsRead: (messageId) => {
    console.log("[messagesApi.markMessageAsRead] messageId:", messageId);
    return apiClient.patch(`/messages/${messageId}/read`);
  },

  markMessageAsDelivered: (messageId) => {
    console.log("[messagesApi.markMessageAsDelivered] messageId:", messageId);
    return apiClient.patch(`/messages/${messageId}/delivered`);
  },

  markChatAsRead: (chatId) => {
    console.log("[messagesApi.markChatAsRead] chatId:", chatId);
    return apiClient.patch(`/messages/chat/${chatId}/read`);
  },

  markChatAsDelivered: (chatId) => {
    console.log("[messagesApi.markChatAsDelivered] chatId:", chatId);
    return apiClient.patch(`/messages/chat/${chatId}/delivered`);
  },

  markChatAsReadUpTo: (chatId, messageId) => {
    console.log(
      "[messagesApi.markChatAsReadUpTo] chatId:",
      chatId,
      "messageId:",
      messageId
    );
    return apiClient.patch(
      `/messages/chat/${chatId}/read-up-to/${messageId}`
    );
  },
};

/* =========================
   SERVICE LAYER
========================= */

export const messagesService = {
  getChatMessages: async ({ chatId, ...params }) => {
    try {
      console.log("[messagesService.getChatMessages] start:", {
        chatId,
        params,
      });

      const res = await messagesApi.getChatMessages(chatId, params);

      console.log("[messagesService.getChatMessages] response:", res);
      console.log("[messagesService.getChatMessages] data:", res.data);
      return res.data;
    } catch (error) {
      console.error("[messagesService.getChatMessages] error:", error);
      throw error;
    }
  },

  sendMessage: async (data) => {
    try {
      console.log("[messagesService.sendMessage] start:", data);

      const res = await messagesApi.sendMessage(data);

      console.log("[messagesService.sendMessage] response:", res);
      console.log("[messagesService.sendMessage] data:", res.data);

      return res.data.data;
    } catch (error) {
      console.error("[messagesService.sendMessage] error:", error);
      throw error;
    }
  },

  editMessage: async ({ messageId, text }) => {
    try {
      console.log("[messagesService.editMessage] start:", {
        messageId,
        text,
      });

      const res = await messagesApi.editMessage(messageId, { text });

      console.log("[messagesService.editMessage] response:", res);
      console.log("[messagesService.editMessage] data:", res.data);

      return res.data.data;
    } catch (error) {
      console.error("[messagesService.editMessage] error:", error);
      throw error;
    }
  },

  deleteMessage: async (messageId) => {
    try {
      console.log("[messagesService.deleteMessage] messageId:", messageId);

      const res = await messagesApi.deleteMessage(messageId);

      console.log("[messagesService.deleteMessage] response:", res);
      console.log("[messagesService.deleteMessage] data:", res.data);

      return res.data.data;
    } catch (error) {
      console.error("[messagesService.deleteMessage] error:", error);
      throw error;
    }
  },

  markMessageAsRead: async (messageId) => {
    try {
      console.log("[messagesService.markMessageAsRead] messageId:", messageId);

      const res = await messagesApi.markMessageAsRead(messageId);

      console.log("[messagesService.markMessageAsRead] response:", res);
      return res.data.data;
    } catch (error) {
      console.error("[messagesService.markMessageAsRead] error:", error);
      throw error;
    }
  },

  markMessageAsDelivered: async (messageId) => {
    try {
      console.log("[messagesService.markMessageAsDelivered] messageId:", messageId);

      const res = await messagesApi.markMessageAsDelivered(messageId);

      console.log("[messagesService.markMessageAsDelivered] response:", res);
      return res.data.data;
    } catch (error) {
      console.error("[messagesService.markMessageAsDelivered] error:", error);
      throw error;
    }
  },

  markChatAsRead: async (chatId) => {
    try {
      console.log("[messagesService.markChatAsRead] chatId:", chatId);

      const res = await messagesApi.markChatAsRead(chatId);

      console.log("[messagesService.markChatAsRead] response:", res);
      return res.data.data;
    } catch (error) {
      console.error("[messagesService.markChatAsRead] error:", error);
      throw error;
    }
  },

  markChatAsDelivered: async (chatId) => {
    try {
      console.log("[messagesService.markChatAsDelivered] chatId:", chatId);

      const res = await messagesApi.markChatAsDelivered(chatId);

      console.log("[messagesService.markChatAsDelivered] response:", res);
      return res.data.data;
    } catch (error) {
      console.error("[messagesService.markChatAsDelivered] error:", error);
      throw error;
    }
  },

  markChatAsReadUpTo: async ({ chatId, messageId }) => {
    try {
      console.log("[messagesService.markChatAsReadUpTo] start:", {
        chatId,
        messageId,
      });

      const res = await messagesApi.markChatAsReadUpTo(chatId, messageId);

      console.log("[messagesService.markChatAsReadUpTo] response:", res);
      return res.data.data;
    } catch (error) {
      console.error("[messagesService.markChatAsReadUpTo] error:", error);
      throw error;
    }
  },
};