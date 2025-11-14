// import { Server } from "socket.io";

// let io: Server | null = null;

// export const GET = async () => {
//   if (!io) {
//     // ✅ Prevent reinitializing multiple servers
//     io = new Server(3001, {
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//       },
//     });

//     console.log("🚀 Socket.IO server initialized on port 3001");

//     io.on("connection", (socket) => {
//       console.log("🟢 User connected:", socket.id);

//       // ✅ Listen for client messages
//       socket.on("sendMessage", (data) => {
//         console.log("📨 Message received from", socket.id, ":", data);

//         // Notify all other users
//         socket.broadcast.emit("newNotification", {
//           text: `New message from ${data.senderId}`,
//           senderId: data.senderId,
//           receiverId: data.receiverId,
//         });

//         // Send message to all connected sockets
//         io?.emit("receiveMessage", data);
//       });

//       socket.on("disconnect", () => {
//         console.log("🔴 User disconnected:", socket.id);
//       });
//     });
//   }

//   return new Response("Socket.IO server running", { status: 200 });
// };
