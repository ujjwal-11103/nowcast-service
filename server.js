import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import planningRoutes from "./src/routes/planning.js";

dotenv.config();

const app = express();
const PORT = 3001;

// =========================
// GLOBAL CORS – ALLOW ALL
// =========================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

// Parse JSON requests
app.use(express.json());

// =========================
// START SERVER AFTER DB
// =========================
const startServer = async () => {
  const db = await connectDB();
  app.locals.db = db;

  // Test route
  app.get("/", (req, res) => {
    res.send("🚀 Nowcast Planning Service (Port 3001) is Running");
  });

  // API Routes
  app.use("/api/planning", planningRoutes);

  // Start listener
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
