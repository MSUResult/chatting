"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/src/context/userContext";

export default function ChatUiClient({ slug }) {
  const { name } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [datas, setDatas] = useState([]);

  console.log("🔥 Rendering ChatUiClient");
  console.log("👉 Current user name:", name);
  console.log("👉 Chat slug:", slug);

  const handleClick = () => {
    console.log("💬 Send button clicked");
    console.log("✉️ Input value:", inputValue);

    if (!inputValue.trim()) {
      console.log("⚠️ Empty message, returning");
      return;
    }

    const newChat = {
      senderId: name,
      receiverId: slug,
      message: inputValue,
    };

    console.log("🛫 Sending chat to DB:", newChat);

    setMessages((prev) => [...prev, inputValue]);
    setInputValue("");
    sendToDb(newChat);
  };

  const sendToDb = async (newChat) => {
    try {
      console.log("📡 Calling /api/sendchat...");
      const res = await fetch("/api/sendchat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newChat),
      });
      const data = await res.json();
      console.log("✅ sendToDb response:", data);

      if (!data.success) {
        console.log("⚠️ Message not saved:", data.error);
      }
    } catch (err) {
      console.log("❌ sendToDb error:", err);
    }
  };

  const takeChat = {
    senderId: name,
    receiverId: slug,
  };

  useEffect(() => { 
    if (!name) {
      console.log("⚠️ Name not yet available — skipping fetch");
      return;
    }

    console.log("📡 useEffect triggered — fetching chat from DB");

    const getToDb = async () => {
      try {
        console.log("🧠 Sending request to /api/getchat:", takeChat);
        const res = await fetch("/api/getchat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(takeChat),
        });
        const data = await res.json();
        console.log("📦 Received chat data:", data);

        setDatas(data?.FIndChat);

        if (!data.success) {
          console.log("⚠️ Data fetch failed:", data.error);
        }
      } catch (err) {
        console.log("❌ getToDb error:", err);
      }
    };

    getToDb();
  }, [name, slug]);

  console.log("💾 Datas state right now:", datas);

  return (
    <main className="h-screen p-4 bg-gradient-to-br from-green-900/10 via-yellow-400 to-green-400 relative flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center mt-6">
        Welcome {name || "Guest"}
      </h1>
      <p className="mt-4 text-3xl font-bold">Chatting with: {slug}</p>

      <section className="flex flex-col gap-4 overflow-y-auto">
        {Array.isArray(datas) && datas.length > 0 ? (
          datas.map((mes, index) => (
            <div key={index}>
              <p
                className={`shadow-2xl p-3 w-fit px-6 font-bold rounded-lg ${
                  mes.senderId === name
                    ? "bg-green-700 text-black"
                    : "bg-white text-black"
                }`}
              >
                {mes.message}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 font-semibold">
            No messages yet
          </p>
        )}
      </section>

      <div className="w-full absolute bottom-5 flex justify-center items-center gap-3">
        <input
          type="text"
          placeholder="Enter Text to message"
          className="border-black border-4 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Send
        </button>
      </div>
    </main>
  );
}
