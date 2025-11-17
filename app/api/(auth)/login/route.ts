import User from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect(); // IMPORTANT

    const { username, password, role } = await req.json();

    const findUser = await User.findOne({ username });

    if (!findUser) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Password is incorrect",
      });
    }

    if (findUser.role !== role) {
      return NextResponse.json({
        success: false,
        message: "Wrong role selected",
      });
    }

    const token = jwt.sign(
      {
        userId: findUser._id,
        name: findUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // Set cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // set true in production
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    console.log("LOGIN API ERROR:", error);
    return NextResponse.json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
