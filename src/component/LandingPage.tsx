"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/userContext";
import { io } from "socket.io-client";

const LandingPage = () => {
  const [members, setMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { name } = useContext(UserContext);
  const router = useRouter();

  // ★★★★★ IMPORTANT ★★★★★
  // Create socket only AFTER name is available
  useEffect(() => {
    if (!name) return;

    console.log("🔗 Connecting with userId:", name);

    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      query: { userId: name },
    });

    // Listen user online
    socket.on("userOnline", (userId) => {
      console.log("🟢 online event:", userId);
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });

    // Listen user offline
    socket.on("userOffline", (userId) => {
      console.log("🔴 offline event:", userId);
      setOnlineUsers((prev) => prev.filter((u) => u !== userId));
    });

    return () => socket.disconnect();
  }, [name]);

  // Fetch list of users
  useEffect(() => {
    const takeUsers = async () => {
      const res = await fetch("/api/allUser").then((r) => r.json());
      if (res.success) {
        setMembers(res.users.filter((u) => u.name !== name));
      }
    };

    if (name) takeUsers();
  }, [name]);

  return (
    <main className="h-screen w-full p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Here They Are — The Best Schools</h1>

      <section className="p-6 rounded-2xl bg-[#1e1e1e]/80">
        <button className="bg-white text-black px-6 py-3 rounded-lg mb-6">
          {name}
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {members.map((user, index) => (
            <div
              key={index}
              onClick={() => router.push(`/chat/${user.name}`)}
              className="p-4 bg-white/10 rounded-xl border cursor-pointer"
            >
              <p className="text-xl font-semibold flex items-center gap-2">
                {user.name}

                {/* green dot if online */}
                {onlineUsers.includes(user.name) && (
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                )}
              </p>

              <p className="text-gray-300">@{user.username}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
