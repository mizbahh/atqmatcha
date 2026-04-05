import express from "express";
import auth from "../middleware/verifyToken.js"
import { isReviewOwner } from "../middleware/isUser.js";
import isAdmin from "../middleware/isAdmin.js";
import { createReview, deleteReview, getAllReviews, getReviewByID, updateReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getAllReviews);

router.get("/:id", getReviewByID);

router.post("/", auth, createReview);

router.put("/:id", auth, isReviewOwner, updateReview);

router.delete("/:id", auth, isReviewOwner, deleteReview);

export default router;

