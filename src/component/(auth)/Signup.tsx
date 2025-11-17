"use client";

import React, { useState } from "react";

const Signup = ({ value }) => {
  const [role, setRole] = useState("");
  const [className, setClassName] = useState("");

  const sendData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password"),
      role,
      className: role === "student" ? className : undefined,
    };

    console.log("Final sending data:", data);

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    if (result.success) {
      value(false);
    }
  };

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-6">Signup</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setRole("student")}
          className={`px-4 py-2 rounded ${
            role === "student" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          type="button"
        >
          Student
        </button>

        <button
          onClick={() => setRole("teacher")}
          className={`px-4 py-2 rounded ${
            role === "teacher" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          type="button"
        >
          Teacher
        </button>

        <button
          onClick={() => setRole("admin")}
          className={`px-4 py-2 rounded ${
            role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          type="button"
        >
          Administrator
        </button>
      </div>

      <form className="flex flex-col gap-4 max-w-md" onSubmit={sendData}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
        />

        {role === "student" && (
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="KG">KG</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Signup
        </button>
      </form>
    </main>
  );
};

export default Signup;
