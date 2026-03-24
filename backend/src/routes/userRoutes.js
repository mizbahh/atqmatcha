import express from "express";
import { createMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;

