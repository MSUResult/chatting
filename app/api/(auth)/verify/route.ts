// app/api/(auth)/verify/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req: Request) => {
  try {
    const cookieStore = await cookies(); // ✅ must await
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN!);

    return NextResponse.json({
      success: true,
      user: {
        id: decoded.userId,
        name: decoded.name,
        username: decoded.username,
        email: decoded.email,
      },
    });
  } catch (error) {
    console.error("JWT verify error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 403 }
    );
  }
};
