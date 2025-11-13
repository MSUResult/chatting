import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Alredy Connected");
    return "Already Connected"; // Returns value to caller
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Student_Chatting",
    });
    return NextResponse.json({ sucess: true, message: "MongoDb Connected" });
  } catch (error) {
    return NextResponse.json({
      sucess: false,
      message: "MongoDb Not Connected",
    });
  }
};
