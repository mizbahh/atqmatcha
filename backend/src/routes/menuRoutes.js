import express from "express";
import auth from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";
import { createMenuItem, deleteMenuItem, getAllMenuItems, getMenuItemByID, updateMenuItem } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItems);

router.get("/:id", getMenuItemByID);

router.post("/", auth, isAdmin, createMenuItem);

router.put("/:id", auth, isAdmin, updateMenuItem);

router.delete("/:id", auth, isAdmin, deleteMenuItem);

export default router;

