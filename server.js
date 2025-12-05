import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import planningRoutes from "./src/routes/planning.js";

dotenv.config();

const app = express();
const PORT = 3001; // Fixed port

// CORS Setup - Allow ALL origins, ALL headers, ALL methods
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: false,
    })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// Start Server After DB Connect
const startServer = async () => {
    const db = await connectDB();
    app.locals.db = db;

    app.get("/", (req, res) => {
        res.send("🚀 Nowcast Planning Service (Port 3001) is Running");
    });

    app.use("/api/planning", planningRoutes);

    app.listen(3001, "0.0.0.0", () => {
        console.log("Server running on port 3001");
    });
};

startServer();