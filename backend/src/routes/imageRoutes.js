import express from "express";
import { getAllImages, getImageByID } from "../controllers/imageController.js";

const router = express.Router();

router.get("/", getAllImages);
router.get("/:id", getImageByID);

export default router;