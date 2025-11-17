"use client";

import React, { useState } from "react";

const Login = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (!role) {
      setMsg("Please select a role");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);
    formData.append("role", role);

    const data = Object.fromEntries(formData.entries());
    console.log("Login Data:", data);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // REQUIRED FOR COOKIES
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("API Response:", result);

      if (result.success) {
        setMsg("Login Successful 🎉");
        e.target.reset();
      } else {
        setMsg(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMsg("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm w-full border p-6 rounded shadow"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {/* Role Selection */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded ${
              role === "student" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 py-2 rounded ${
              role === "teacher" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Teacher
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded ${
              role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Inputs */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />

        {/* Message */}
        {msg && (
          <p className="text-center text-sm text-red-500 font-medium">{msg}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
};

export default Login;
