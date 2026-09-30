import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import missionRoutes from "./routes/missionRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    station: "Eclipse Station"
  });
});

app.use(
  "/api/missions",
  missionRoutes
);

app.use(
  "/api/attempts",
  attemptRoutes
);

app.use(
  "/api/leaderboard",
  leaderboardRoutes
);

async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("🛰️ MongoDB connected");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message
    );

    process.exit(1);
  }
}

startServer();