import express from "express";
import { createMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";
import { createReview, deleteReview, getAllReviews, updateReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getAllReviews);

router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;

