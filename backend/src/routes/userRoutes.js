import express from "express";
import auth from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";
import { createUser, deleteUser, getAllUsers, getUserByID, makeAdmin, updateUser } from "../controllers/userController.js";

const router = express.Router();

// PUBLIC routes
router.post("/register", createUser);

// ADMIN routes 
router.get("/", auth, isAdmin, getAllUsers);
router.get("/:id", auth, isAdmin, getUserByID);
router.post("/", auth, isAdmin, createUser);
router.put("/:id", auth, isAdmin, updateUser);
router.put("/make-admin/:id", auth, isAdmin, makeAdmin);
router.delete("/:id", auth, isAdmin, deleteUser);

export default router;

