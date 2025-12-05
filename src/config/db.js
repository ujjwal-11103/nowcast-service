import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Create the client outside the function to share connection if needed later
const client = new MongoClient(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    retryWrites: true,
});

export async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected Successfully to MongoDB Atlas");

        // SPECIFIC CHANGE: Connect strictly to 'Supplychain' database
        return client.db("Supplychain");

    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // Exit process with failure
    }
}