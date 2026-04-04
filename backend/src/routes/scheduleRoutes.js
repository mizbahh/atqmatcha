import express from "express";
import auth from "../middleware/verifyToken.js"
import isAdmin from "../middleware/isAdmin.js";
import { createScheduledEvent, deleteScheduledEvent, getAllScheduledEvents, getScheduledEventByID, updateScheduledEvent } from "../controllers/scheduleController.js";


const router = express.Router();

router.get("/", getAllScheduledEvents);

router.get("/:id", getScheduledEventByID);

router.post("/", auth, isAdmin, createScheduledEvent);

router.put("/:id", auth, isAdmin, updateScheduledEvent);

router.delete("/:id", auth, isAdmin, deleteScheduledEvent);

export default router;

