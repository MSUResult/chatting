"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ add this
import { UserContext } from "../context/userContext";

const LandingPage = () => {
  const [members, setMembers] = useState([]);
  const { name } = useContext(UserContext);
  const router = useRouter(); // ✅ initialize router

  useEffect(() => {
    const takeUsers = async () => {
      try {
        const data = await fetch("/api/allUser");
        const res = await data.json();

        if (res.success) {
          const filtered = res.users.filter((u) => u.name !== name);
          setMembers(filtered);
        } else {
          console.error("Failed to fetch users:", res.message);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    takeUsers();
  }, [name]);

  return (
    <main className="h-screen w-full p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Here They Are — The Best Schools
      </h1>

      <section className="h-full w-full bg-[#1e1e1e]/80 shadow-2xl p-6 rounded-2xl">
        <button className="text-center font-bold bg-white text-black px-6 py-3 rounded-lg mb-6 hover:bg-gray-200 transition">
          {name}
        </button>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {members.length > 0 ? (
            members.map((user, index) => (
              <div
                key={index}
                className="p-4 bg-white/10 rounded-xl border border-white/20 shadow-md cursor-pointer hover:bg-white/20 transition"
                onClick={() => router.push(`/chat/${user.name}`)} // ✅ fixed route
              >
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-gray-300">@{user.username}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">
              No users found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
