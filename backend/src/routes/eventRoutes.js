import express from "express";
import auth from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";
import { createEvent, deleteEvent, getAllEvents, getEventByID, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);

router.get("/:id", getEventByID);

router.post("/", auth, isAdmin, createEvent);

router.put("/:id", auth, isAdmin, updateEvent);

router.delete("/:id", auth, isAdmin, deleteEvent);

export default router;

