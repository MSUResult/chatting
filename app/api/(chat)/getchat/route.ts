import { dbConnect } from "@/lib/db";
import { chat } from "@/models/Chat";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("📡 [API] /api/getchat called");
    await dbConnect();
    console.log("✅ DB connected");

    const { senderId, receiverId } = await req.json();
    console.log("📥 Request body:", { senderId, receiverId });

    const FIndChat = await chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    console.log("📦 Found chats:", FIndChat.length);

    return NextResponse.json({ success: true, FIndChat });
  } catch (error) {
    console.error("❌ [API] getchat error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
