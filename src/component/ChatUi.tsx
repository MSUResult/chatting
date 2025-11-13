"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/src/context/userContext";
import { io } from "socket.io-client";

const socket = io("https://localhost:3001" , {transports:["websocket"]})

export default function ChatUiClient({ slug }) {
  const { name } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [datas, setDatas] = useState([]);

  // ✅ Get chat from DB once
  useEffect(() => {
    if (!name || !slug) return;
    const takeChat = { senderId: name, receiverId: slug };

    const getChats = async () => {
      const res = await fetch("/api/getchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(takeChat),
      });
      const data = await res.json();
      setDatas(data?.FIndChat || []);
    };

    getChats();
  }, [name, slug]);

  // ✅ Real-time updates using socket
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("📩 New message:", data);

      // only show messages that belong to this chat pair
      if (
        (data.senderId === name && data.receiverId === slug) ||
        (data.senderId === slug && data.receiverId === name)
      ) {
        setDatas((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [name, slug]);

  // ✅ Send message
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMsg = {
      senderId: name,
      receiverId: slug,
      message: inputValue,
    };

    // send to DB
    try {
      await fetch("/api/sendchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });
    } catch (err) {
      console.error("❌ DB Error:", err);
    }

    // send through socket for instant update
    socket.emit("sendMessage",newMsg)
    setInputValue("");
  };

  return (
    <main className="h-screen p-4 bg-gradient-to-br from-green-900/10 via-yellow-400 to-green-400 relative flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center mt-6">
        Welcome {name || "Guest"}
      </h1>
      <p className="mt-4 text-3xl font-bold">Chatting with: {slug}</p>

      {/* Chat box */}
      <section className="flex flex-col gap-3 overflow-y-auto">
        {datas.length > 0 ? (
          datas.map((mes, i) => (
            <div key={i} className="w-full flex">
              <p
                className={`max-w-[60%] px-4 py-2 rounded-lg shadow ${
                  mes.senderId === name
                    ? "bg-green-600 text-white ml-auto"
                    : "bg-white text-black"
                }`}
              >
                {mes.message}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No messages yet</p>
        )}
      </section>

      {/* Input */}
      <div className="w-full absolute bottom-5 flex justify-center items-center gap-3">
        <input
          type="text"
          placeholder="Enter your message..."
          className="border-2 border-black rounded-lg px-4 py-2 w-1/2 focus:outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Send
        </button>
      </div>
    </main>
  );
}
