import mongoose, { Schema } from "mongoose";

const schoolSchema = new Schema(
  {
    SchoolName: { type: String, required: true },
    SchoolLocation: { type: String, required: true },
    schoolPhotoUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export const School =
  mongoose.models.School || mongoose.model("School", schoolSchema);
