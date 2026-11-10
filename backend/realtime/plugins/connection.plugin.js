import { handlePresence } from "../connection/presence.js";
import { hydrateUserRooms } from "../connection/hydrateRooms.js";
import { registerDisconnect } from "../connection/disconnect.js";

export async function connectionPlugin(io, socket) {
  const userId = socket?.data?.user?.id;
  socket.data.ready = false;
  try {
    await handlePresence(io, socket, userId);
  } catch (err) {
  }

  try {
    const rooms = await hydrateUserRooms(userId);

    if (socket.disconnected) {
      return;
    }

    for (const roomId of rooms) {
      socket.join(roomId);
    }

    socket.data.ready = true;

    socket.emit("connection.ready", {
      userId,
      roomsCount: rooms.length,
      timestamp: Date.now()
    });

  } catch (err) {
    socket.emit("connection.failed", {
      reason: "ROOM_HYDRATION_FAILED",
      timestamp: Date.now()
    });
  }
  registerDisconnect(io, socket, userId);
}