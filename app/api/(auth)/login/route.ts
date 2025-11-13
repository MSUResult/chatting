import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // 1️⃣ Find user
    const FindUser = await User.findOne({ email });
    if (!FindUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, FindUser.password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Wrong password",
      });
    }

    // 3️⃣ Create JWT token
    const token = jwt.sign(
      {
        userId: FindUser._id,
        name: FindUser.name,
        email: FindUser.email,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    // 4️⃣ Create response and set cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
