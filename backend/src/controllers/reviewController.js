import mongoose from "mongoose";
import review from "../models/review.js";

export async function getAllReviews(_, res) {
  try {
    const reviews = await review.find().sort({ createdOn: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error in getAllReviews controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getReviewByID(req, res) {
  try {
    const selectedReview = await review.findById(req.params.id);

    if (!selectedReview) {
      return res.status(404).json({ message: "Review Not Found" });
    }

    res.status(200).json(selectedReview);
  } catch (error) {
    console.error("Error in getReviewByID controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createReview(req, res) {
  try {
    const { name, title, content, rating, displayDate } = req.body;

    if (!name || !content || rating === undefined || rating === null) {
      return res.status(400).json({
        message: "Name, content, and rating are required."
      });
    }

    const fallbackCustomerId = "69c577496e2ee41877eae050";

    const customerId =
      req.user?.id ||
      (mongoose.Types.ObjectId.isValid(fallbackCustomerId) ? fallbackCustomerId : null);

    const newReview = new review({
      name: name.trim(),
      title: (title || "Review").trim(),
      content: content.trim(),
      rating,
      customerId,
      displayDate: (displayDate || "").trim()
    });

    const savedReview = await newReview.save();

    console.log("Review Created Successfully");
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error in createReview controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateReview(req, res) {
  try {
    const reviewToUpdate = await review.findById(req.params.id);

    if (!reviewToUpdate) {
      return res.status(404).json({ message: "Review Not Found" });
    }

    if (
      req.user.role === "admin" ||
      reviewToUpdate.customerId?.toString() === req.user.id
    ) {
      const { name, title, content, rating, displayDate } = req.body;

      const updatedReview = await review.findByIdAndUpdate(
        req.params.id,
        {
          ...(name !== undefined ? { name } : {}),
          ...(title !== undefined ? { title } : {}),
          ...(content !== undefined ? { content } : {}),
          ...(rating !== undefined ? { rating } : {}),
          ...(displayDate !== undefined ? { displayDate } : {})
        },
        {
          new: true,
          runValidators: true
        }
      );

      console.log("Review Updated Successfully");
      return res.status(200).json(updatedReview);
    }

    return res.status(403).json({
      message: "Not Authorized - User Cannot Update Other Users' Reviews"
    });
  } catch (error) {
    console.error("Error in updateReview controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteReview(req, res) {
  try {
    const selectedReview = await review.findById(req.params.id);

    if (!selectedReview) {
      return res.status(404).json({ message: "Review Not Found" });
    }

    if (
      req.user.role === "admin" ||
      selectedReview.customerId?.toString() === req.user.id
    ) {
      await selectedReview.deleteOne();
      return res.status(200).json({ message: "Review Deleted Successfully" });
    }

    return res.status(403).json({
      message: "Not Authorized - User Cannot Delete Other Users' Reviews"
    });
  } catch (error) {
    console.error("Error in deleteReview controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}