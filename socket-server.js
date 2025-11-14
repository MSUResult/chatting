import { Server } from "socket.io";
import redis from "./lib/redis.js";

const io = new Server(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

console.log("🚀 Socket.IO running on PORT 3001");

io.on("connection", async (socket) => {
  console.log("🟢 Connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (!userId) return;

  // ⭐ IMPORTANT: Use LOWERCASE Redis commands
  await redis.sadd("online_users", userId);

  console.log("User Online:", userId);
  io.emit("userOnline", userId);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", async () => {
    await redis.srem("online_users", userId);

    console.log("🔴 Disconnected:", userId);
    io.emit("userOffline", userId);
  });
});
