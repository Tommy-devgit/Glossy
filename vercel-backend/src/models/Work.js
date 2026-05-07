import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Religious", "Wedding", "Portrait", "Art", "Traditional", "Ordinary", "Historical", "Landscape"],
      default: "Portrait",
    },
  },
  { timestamps: true },
);

export const Work = mongoose.models.Work ?? mongoose.model("Work", workSchema);
