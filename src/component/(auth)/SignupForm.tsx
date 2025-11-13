"use client";
import React, { useState } from "react";

export default function SignupForm({ onSwitch }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const { name, username, email, password } = data;

    // ✅ Simple validation
    if (!name || !username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        setError(response.message || "Signup failed");
      } else {
        alert("Signup successful!");
        onSwitch(); // ✅ Go to login
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-white w-full">
      <h1 className="text-4xl font-bold">Create an Account</h1>

      <p className="text-gray-200 font-medium">
        Already have an account?
        <button
          type="button"
          onClick={onSwitch}
          className="ml-2 text-white font-bold underline hover:no-underline"
        >
          Login
        </button>
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="flex-1 p-3 rounded-md bg-white/20 placeholder-white/80 focus:ring-2 focus:ring-white outline-none"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="flex-1 w-full p-3 rounded-md bg-white/20 placeholder-white/80 focus:ring-2 focus:ring-white outline-none"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-3 rounded-md bg-white/20 placeholder-white/80 focus:ring-2 focus:ring-white outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-3 rounded-md bg-white/20 placeholder-white/80 focus:ring-2 focus:ring-white outline-none"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full p-3 bg-white text-[#43334C] font-bold rounded-md hover:bg-gray-200 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <div className="flex items-center w-full my-4 text-gray-400">
        <div className="flex-1 border-t border-gray-400"></div>
        <span className="px-3 font-medium text-lg">or register with</span>
        <div className="flex-1 border-t border-gray-400"></div>
      </div>

      <button className="w-full p-3 border border-white text-white font-bold rounded-md hover:bg-white/10 transition duration-300">
        Continue with Google
      </button>
    </div>
  );
}
