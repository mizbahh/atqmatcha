import express from "express";
import auth from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, getAnnouncementByID, updateAnnouncement } from "../controllers/announcementController.js"

const router = express.Router();

router.get("/", auth, getAllAnnouncements);

router.get("/:id", auth, getAnnouncementByID);

router.post("/", auth, isAdmin, createAnnouncement);

router.put("/:id", auth, isAdmin, updateAnnouncement);

router.delete("/:id", auth, isAdmin, deleteAnnouncement);

export default router;

