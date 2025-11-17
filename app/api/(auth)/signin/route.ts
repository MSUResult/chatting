import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, username, password, role, className } = body;

    if (!name || !username || !password || !role) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (role === "student" && !className) {
      return NextResponse.json(
        { success: false, message: "Student must select class" },
        { status: 400 }
      );
    }

    const existUser = await User.findOne({ username });
    if (existUser) {
      return NextResponse.json(
        { success: false, message: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      role,
      className: role === "student" ? className : undefined,
    });

    return NextResponse.json(
      { success: true, message: "Signup Successful", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
