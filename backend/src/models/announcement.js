import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    tag: {
      type: String,
      required: true,
      enum: ["Announcement", "New Item", "Behind the Scenes", "Event Recap", "Tip"],
      default: "Announcement",
      trim: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    readTime: {
      type: String,
      default: "1 min",
      trim: true
    },
    displayDate: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "lastModified"
    }
  }
);

const announcement = mongoose.model("announcement", announcementSchema);

export default announcement;