import express from "express";
import auth from "../middleware/verifyToken.js"
import { createReview, deleteReview, getAllReviews, getReviewByID, updateReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getAllReviews);

router.get("/:id", getReviewByID);

router.post("/", createReview);

router.put("/:id", auth, updateReview);

router.delete("/:id", auth, deleteReview);

export default router;

