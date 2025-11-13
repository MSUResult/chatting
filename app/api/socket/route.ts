import { Server } from "socket.io";

let io;

export const GET = async (req) => {
  if (!io) {
    io = new Server(3001, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
     io = global.io;

    io.on("connection", (socket) => {
      console.log("🟢 User connected:", socket.id);

      // when client sends message
      socket.on("sendMessage", (data) => {
        console.log("📨 Message received from", socket.id, ":", data);

        socket.broadcast.emit("newNotification", {
  text: `New message from ${data.senderId}`,
  senderId: data.senderId,
  receiverId: data.receiverId,
});





        io.emit("receiveMessage", data); // send to everyone
      });

      
      socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket.IO server running", { status: 200 });
};
