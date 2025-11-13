"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm({ onSwitch }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        alert(responseData.message || "Login failed");
      } else {
        alert("Login successful!");
        router.push("/");
        // You can redirect or do something else here
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-white w-full">
      {/* Heading */}
      <h1 className="text-4xl font-bold">Welcome Back!</h1>

      {/* Switch to signup */}
      <p className="text-gray-200 font-medium">
        Don't have an account?
        <button
          type="button" // prevent form submit
          onClick={onSwitch}
          className="ml-2 text-white font-bold underline hover:no-underline transition-colors"
        >
          Sign Up
        </button>
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md"
      >
        <input
          type="email"
          name="email" // ✅ added
          placeholder="Email"
          className="p-3 rounded-md bg-white/20 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
          required
        />
        <input
          type="password"
          name="password" // ✅ added
          placeholder="Password"
          className="p-3 rounded-md bg-white/20 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-2 w-full p-3 bg-white text-[#43334C] font-bold rounded-md hover:bg-gray-200 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center w-full my-4 text-gray-400">
        <div className="flex-1 border-t border-gray-400"></div>
        <span className="px-3 font-medium text-lg">or login with</span>
        <div className="flex-1 border-t border-gray-400"></div>
      </div>

      {/* Social Button */}
      <button className="w-full p-3 border border-white text-white font-bold rounded-md hover:bg-white/10 transition duration-300">
        Continue with Google
      </button>
    </div>
  );
}
