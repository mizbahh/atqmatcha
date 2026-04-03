import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "user",
      default: null
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

const review = mongoose.model("review", reviewSchema);

export default review;