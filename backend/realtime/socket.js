import { Server } from "socket.io";
import { socketAuth } from "./security/socketAuth.js";
import { setupSocketRedisAdapter } from "./utils/setup/socketRedisAdapter.js";
import { connectProducer } from "../kafka/producer.js";
import { registerPlugins } from "./plugins/registorPlugins.js";


let io;

export async function initSocket(server) {
  
  const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map(o => o.trim());
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST"]
    }
  });

io.use((socket, next) => {
  console.log("SOCKET AUTH START:", socket.id);

  socketAuth(socket, (err) => {
    if (err) {
      console.error("SOCKET AUTH ERROR:", err);
    } else {
      console.log("SOCKET AUTH SUCCESS:", socket.id);
    }

    next(err);
  });
});

  try {
    await Promise.all([
      setupSocketRedisAdapter(io),
      connectProducer()
    ]);
  } catch (err) {
    throw err;
  }
  io.on("connection", async (socket) => {
    console.log("SOCKET CONNECTED:", socket.id);

    socket.on("disconnect", (reason) => {
      console.log("SOCKET DISCONNECTED:", socket.id, reason);
    });

    try {
      await registerPlugins(io, socket);
      console.log("PLUGINS REGISTERED:", socket.id);
    } catch (err) {
      console.error("REGISTER PLUGINS ERROR:", err);
      socket.disconnect(true);
    }
  });
  return io;
}



export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};