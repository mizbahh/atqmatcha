import express from "express";
import { createMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";
import { createOrder, deleteOrder, getAllOrders, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getAllOrders);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

export default router;

