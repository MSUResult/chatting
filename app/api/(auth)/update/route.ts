// app/api/(auth)/update/route.ts
import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { dbConnect } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    await dbConnect();

    // Parse request body safely
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { oldName, newName, schoolName } = body;

    if (!oldName || !newName || !schoolName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use findOneAndUpdate for cleaner update
    const updatedUser = await User.findOneAndUpdate(
      { name: oldName },
      { name: newName, schoolName },
      { new: true } // return updated doc
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        schoolName: updatedUser.schoolName,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user" },
      { status: 500 }
    );
  }
};
