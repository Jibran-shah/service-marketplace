import { onEvent } from "../../utils/event.register.js";
import { EVENTS } from "../../constants/events.constants.js";
import { requireAuth } from "../../security/guards.js";

import {
  handleRoomJoin,
  handleRoomLeave,
  handleMessageSend,
  handleMessageDelivered,
  handleMessageRead,
  handleTypingStart,
  handleTypingStop
} from "./chat.handlers.js";

/**
 * Chat Events Registration Layer
 * ONLY maps events → handlers
 */
export function registerChatEvents(io, socket) {
  /*
  =====================================================
  ROOM JOIN
  =====================================================
  */
  onEvent(
    socket,
    EVENTS.CHAT.ROOM_JOIN,
    [requireAuth],
    async (socket, payload) => {
      const result = await handleRoomJoin(socket, payload);
      return result;
    }
  );

  /*
  =====================================================
  ROOM LEAVE
  =====================================================
  */
  onEvent(
    socket,
    EVENTS.CHAT.ROOM_LEAVE,
    [requireAuth],
    async (socket, payload) => {
      const result = await handleRoomLeave(socket, payload);
      return result;
    }
  );

  /*
  =====================================================
  MESSAGE SEND
  =====================================================
  */
  onEvent(
    socket,
    EVENTS.CHAT.MESSAGE_SEND,
    [requireAuth],
    async (socket, payload) => {
      const result = await handleMessageSend(io, socket, payload);
      return result;
    }
  );

  /*
  =====================================================
  MESSAGE DELIVERED
  =====================================================
  */
  onEvent(
    socket,
    EVENTS.CHAT.MESSAGE_DELIVERED,
    [requireAuth],
    async (socket, payload) => {
      const result = await handleMessageDelivered(socket, payload);
      return result;
    }
  );

  /*
  =====================================================
  MESSAGE READ
  =====================================================
  */
  onEvent(
    socket,
    EVENTS.CHAT.MESSAGE_READ,
    [requireAuth],
    async (socket, payload) => {
      const result = await handleMessageRead(socket, payload);
      return result;
    }
  );

  /*
  =====================================================
  TYPING START
  =====================================================
  */
  onEvent(
    socket,
    EVENTS.CHAT.TYPING_START,
    [requireAuth],
    async (socket, payload) => {
      const result = await handleTypingStart(socket, payload);
      return result;
    }
  );

  /*
  =====================================================
  TYPING STOP
  =====================================================
  */
  onEvent(
    socket,
    EVENTS.CHAT.TYPING_STOP,
    [requireAuth],
    async (socket, payload) => {
      const result = await handleTypingStop(socket, payload);
      return result;
    }
  );
}