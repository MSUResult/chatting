"use client";
import { UserContext } from "@/src/context/userContext";
import React, { useContext, useEffect, useState } from "react";

const Profile = () => {
  const { userName, setUserName } = useContext(UserContext); // ✅ from context
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(""); // new name input
  const [schoolName, setSchoolName] = useState(""); // school name input

  // ✅ Send data to /api/update
  const handleClick = async () => {
    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldName: userName,
          newName,
          schoolName,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setUserName(newName); // update context instantly
        alert("Profile updated successfully!");
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <main className="h-screen bg-black/80 flex items-center justify-center p-5">
      <section className="bg-white shadow-2xl p-8 flex items-center justify-center flex-col gap-8 rounded-2xl">
        {edit ? (
          <>
            <input
              placeholder="Enter your new name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg mb-4 w-64"
            />
            <button
              className="bg-green-500 text-white font-bold p-3 px-8 rounded-lg hover:bg-green-600"
              onClick={() => setEdit(false)}
            >
              Done
            </button>
          </>
        ) : (
          <>
            <p className="font-bold text-3xl mb-4">
              {userName || "No name found"}
            </p>
            <button
              className="bg-blue-500 text-white font-bold p-3 px-8 rounded-lg hover:bg-blue-600"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </>
        )}

        <div className="mt-6 flex flex-col items-center">
          <p className="font-bold text-2xl mb-2">Enter your School Name:</p>
          <input
            type="text"
            name="school"
            placeholder="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-64"
          />
        </div>

        <button
          className="bg-black text-white font-bold p-4 px-8 mt-6 rounded-lg hover:bg-gray-900"
          onClick={handleClick}
        >
          Save Changes
        </button>
      </section>
    </main>
  );
};

export default Profile;
