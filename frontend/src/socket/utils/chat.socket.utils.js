import { EVENTS } from "../../../../backend/realtime/constants/events.constants";
import { onSocketEvent, offSocketEvent } from "../socket.events";

/* =========================================================
   REGISTER CHAT SOCKET LISTENERS
========================================================= */
export const registerChatSocket = (handlers = {}) => {
  Object.entries({
    [EVENTS.CHAT.MESSAGE_SEND]: handlers.onNewMessage,
    [EVENTS.CHAT.MESSAGE_DELIVERED]: handlers.onDelivered,
    [EVENTS.CHAT.MESSAGE_READ]: handlers.onRead,
    [EVENTS.CHAT.TYPING_START]: handlers.onTypingStart,
    [EVENTS.CHAT.TYPING_STOP]: handlers.onTypingStop,
  }).forEach(([event, handler]) => {
    if (!handler) {
      console.warn(`⚠️ Missing handler for ${event}`);
      return;
    }
    onSocketEvent(event, handler);
  });
};

/* =========================================================
   UNREGISTER CHAT SOCKET LISTENERS
========================================================= */

export const unregisterChatSocket = (handlers = {}) => {
  const {
    onNewMessage,
    onDelivered,
    onRead,
    onTypingStart,
    onTypingStop,
  } = handlers;

  if (onNewMessage) {
    offSocketEvent(EVENTS.CHAT.MESSAGE_SEND, onNewMessage);
  }

  if (onDelivered) {
    offSocketEvent(EVENTS.CHAT.MESSAGE_DELIVERED, onDelivered);
  }

  if (onRead) {
    offSocketEvent(EVENTS.CHAT.MESSAGE_READ, onRead);
  }

  if (onTypingStart) {
    offSocketEvent(EVENTS.CHAT.TYPING_START, onTypingStart);
  }

  if (onTypingStop) {
    offSocketEvent(EVENTS.CHAT.TYPING_STOP, onTypingStop);
  }
};