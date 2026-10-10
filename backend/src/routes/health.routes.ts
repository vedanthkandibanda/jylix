import { Router } from "express";

import { db } from "../config/db.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Jylix backend is running",
    timestamp: new Date().toISOString(),
  });
});

router.get("/health/db", async (_req, res) => {
  try {
    const result = await db.query("SELECT 1 AS connected");

    res.json({
      success: true,
      message: "Jylix database connection is working",
      database: result.rows[0].connected === 1,
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default router;