import cors from "cors";
import express from "express";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5001;

app.use(cors());

// middleware to get access to the request body
app.use(express.json());

app.get("/", (_, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/menuItems", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/images", imageRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});