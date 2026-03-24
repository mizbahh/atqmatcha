import express from "express";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app = express()
const PORT = parseInt(process.env.PORT, 10);

app.use(express.json());
app.use("/api/menus", menuRoutes);


//app.use("/api/orders", orderRoutes);
//app.use("/api/events", eventRoutes);
//app.use("/api/reviews", reviewRoutes);
//app.use("/api/users", userRoutes);


app.listen(PORT, () =>{
    console.log("Server started on PORT:", PORT);
});

