// src/server.ts
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import itemRoutes from "./routes/itemRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
