import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: true,
      trim: true
    },
    alt: {
      type: String,
      required: true,
      trim: true
    },
    tag: {
      type: String,
      required: true,
      trim: true
    },
    height: {
      type: Number,
      required: true,
      default: 300
    }
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "lastModified"
    }
  }
);

const image = mongoose.model("image", imageSchema);

export default image;