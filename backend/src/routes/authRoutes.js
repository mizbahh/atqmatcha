import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

//register route - publicly create User
router.post("/register", registerUser);

//login rout
router.post("/login", loginUser);

export default router;


