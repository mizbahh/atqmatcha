import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderByID, updateOrder } from "../controllers/orderController.js";
import auth from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", auth, isAdmin, getAllOrders);

router.get("/:id", auth, getOrderByID);

router.post("/", auth, createOrder);

router.put("/:id", auth, updateOrder);

router.delete("/:id", auth, deleteOrder);

export default router;

