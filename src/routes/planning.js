import express from "express";

const router = express.Router();

// GET /api/planning/data
router.get("/data", async (req, res) => {
    try {
        // Access the DB instance we attached to the app in server.js
        const db = req.app.locals.db;

        // SPECIFIC CHANGE: Target the 'JF_censored' collection
        const collection = db.collection("JF_censored");

        // Fetch data (limiting to 100 to avoid overwhelming the browser)
        const data = await collection.find({}).toArray();
        console.log("Fetched from DB:", data.length);

        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });

    } catch (error) {
        console.error("Error fetching JF_censored data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;