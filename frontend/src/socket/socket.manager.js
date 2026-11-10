import { socket } from "./socket.client";

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.off("connect");
  socket.off("disconnect");
  socket.offAny();
  socket.on("connect", () => {
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 socket disconnected:", reason);
  });

  socket.onAny((event, ...args) => {
  });
};

export const disconnectSocket = () => {
  socket.removeAllListeners();
  socket.disconnect();
};

export const socketEmit = (event, payload, ack) => {
  if (!socket) {
    return false;
  }

  if (!socket.connected) {
    return false;
  }

  if (typeof ack === "function") {
    socket.emit(event, payload, ack);
  } else {
    socket.emit(event, payload);
  }

  return true;
};