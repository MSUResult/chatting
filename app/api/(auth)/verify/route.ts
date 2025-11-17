import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = verifyToken(req);

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Access granted",
    user,
  });
}
