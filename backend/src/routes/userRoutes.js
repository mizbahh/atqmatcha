import express from "express";
import auth from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";
import { createUser, deleteUser, getAllUsers, makeAdmin, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", auth, isAdmin, createUser);

router.put("/:id", auth, isAdmin, updateUser);

router.put("/make-admin/:id", auth, isAdmin, makeAdmin);

router.delete("/:id", auth, isAdmin, deleteUser);

export default router;

