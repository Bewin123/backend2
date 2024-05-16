const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

// Get daily analytics for all URLs
router.get("/daily", analyticsController.getDailyAnalytics);

// Get monthly analytics for all URLs
router.get("/monthly", analyticsController.getMonthlyAnalytics);

module.exports = router;
