import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js"; // Note the .js extension is required in ES Modules
import planningRoutes from "./src/routes/planning.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());



app.use(express.json());

// Initialize DB and Start Server
// We use an async function wrapper to ensure DB connects BEFORE server starts
const startServer = async () => {
    const db = await connectDB();

    // Make the database instance available globally to all routes
    app.locals.db = db;

    // Routes
    app.get("/", (req, res) => {
        res.send("🚀 Nowcast Planning Service is Running");
    });

    // Mount the planning routes at /api/planning
    app.use("/api/planning", planningRoutes);

    app.listen(3001, "0.0.0.0", () => {
        console.log("Server running on port 3000");
    });

};

startServer();