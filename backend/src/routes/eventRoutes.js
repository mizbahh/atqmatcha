import express from "express";
import { createEvent, deleteEvent, getAllEvents, getEventByID, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);

router.get("/:id", getEventByID);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;

