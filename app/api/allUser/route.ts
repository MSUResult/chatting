// app/api/(auth)/getAllUsers/route.ts
import { NextResponse } from "next/server";

import { User } from "@/models/User";
import { dbConnect } from "@/lib/db";

export const GET = async () => {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch all users
    const users = await User.find({});

    // Return success response
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
