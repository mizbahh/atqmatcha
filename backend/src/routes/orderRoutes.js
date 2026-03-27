import express from "express";
import { createOrder, deleteOrder, getAllOrders, updateOrder } from "../controllers/orderController.js";
import auth from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllOrders);

router.post("/", auth, createOrder);

router.put("/:id", auth, updateOrder);

router.delete("/:id", auth, deleteOrder);

export default router;

