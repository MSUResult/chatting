import { dbConnect } from "@/lib/db";
import { chat } from "@/models/Chat";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("📡 [API] /api/sendchat called");
    await dbConnect();
    console.log("✅ DB connected");

    const { senderId, receiverId, message } = await req.json();
    console.log("📥 Incoming data:", { senderId, receiverId, message });

    const saved = await chat.create({ senderId, receiverId, message });
    console.log("✅ Chat saved:", saved);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ [API] sendchat error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
