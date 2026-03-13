import express from "express";
import menuRoutes from "./routes/menuRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;

connectDB();

app.use("/api/menus", menuRoutes);


app.listen(PORT, () =>{
    console.log("Server started on PORT:", PORT);
});

