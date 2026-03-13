import express from "express";
import { createMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItems);

router.post("/", createMenuItem);

router.put("/:id", updateMenuItem);

router.delete("/:id", deleteMenuItem);

export default router;

