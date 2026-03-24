import express from "express";
import { createMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";
import { createEvent, deleteEvent, getAllEvents, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;

