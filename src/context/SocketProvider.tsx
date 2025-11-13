"use client"; // 👈 MUST be the very first line — no blank lines above this!

import { createContext, useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext<any>(null);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useMemo(() => io("http://localhost:3001"), []);

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    socket.on("newNotification", (data) => {
      console.log("🔔 Notification:", data);
      setNotification(data.text);
      setTimeout(() => setNotification(null), 5000);
    });

    return () => socket.off("newNotification");
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {notification && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
      {children}
    </SocketContext.Provider>
  );
}
