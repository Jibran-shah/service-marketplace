import { EVENTS } from "../../../backend/realtime/constants/events.constants";
import { socket } from "./socket.client";
import { citeToast } from "../utils/citeToast";
import { ensureChatData } from "../utils/query.utils";

const listeners = {
  [EVENTS.CHAT.MESSAGE_SEND]: new Set(),
  [EVENTS.CHAT.MESSAGE_DELIVERED]: new Set(),
  [EVENTS.CHAT.MESSAGE_READ]: new Set(),
  [EVENTS.CHAT.TYPING_START]: new Set(),
  [EVENTS.CHAT.TYPING_STOP]: new Set(),
};


socket.on("notification",async ({type,title,message,data})=>{
  const sender = data.senderId;
  const chat = await ensureChatData(data.chatId);
  const image = chat?.data?.participants.find((participant)=>participant._id === sender)?.profile?.avatar?.file?.url;
  const senderName = chat?.data?.participants.find((participant)=>participant._id === sender)?.profile?.name;
  citeToast({
    type,
    title:senderName,
    message,
    image
  });
})


socket.on(EVENTS.CHAT.MESSAGE_SEND, (data) => {
  listeners[EVENTS.CHAT.MESSAGE_SEND].forEach((fn) => {
    fn(data);
  });
});

socket.on(EVENTS.CHAT.MESSAGE_DELIVERED, (data) => {
  listeners[EVENTS.CHAT.MESSAGE_DELIVERED].forEach((fn) => {
    fn(data);
  });
});

socket.on(EVENTS.CHAT.MESSAGE_READ, (data) => {
  listeners[EVENTS.CHAT.MESSAGE_READ].forEach((fn) => {
    fn(data);
  });
});

socket.on(EVENTS.CHAT.TYPING_START, (data) => {
  listeners[EVENTS.CHAT.TYPING_START].forEach((fn) => {
    fn(data);
  });
});

socket.on(EVENTS.CHAT.TYPING_STOP, (data) => {
  listeners[EVENTS.CHAT.TYPING_STOP].forEach((fn) => {
    fn(data);
  });
});

/*
=====================================================
SUBSCRIPTION API
=====================================================
*/

export const onSocketEvent = (event, handler) => {
  if (!listeners[event]) {
    return;
  }
  listeners[event].add(handler);
};

export const offSocketEvent = (event, handler) => {
  if (!listeners[event]) {
    return;
  }
  listeners[event].delete(handler);
};