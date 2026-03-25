import express from "express";
import { createMenuItem, deleteMenuItem, getAllMenuItems, getMenuItemByID, updateMenuItem } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItems);

router.get("/:id", getMenuItemByID);

router.post("/", createMenuItem);

router.put("/:id", updateMenuItem);

router.delete("/:id", deleteMenuItem);

export default router;

