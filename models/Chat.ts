import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    senderId: { type: String, required: true }, // changed from ObjectId
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true } // ✅ add this — helpful for chat order and history
);

export const chat = mongoose.models.chat || mongoose.model("chat", chatSchema);
