const Analytics = require("../models/Analytics");

// Get analytics for all URLs created per day
exports.getDailyAnalytics = async (req, res) => {
  try {
    // Get current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const day = currentDate.getDate();

    // Get analytics for today
    const dailyAnalytics = await Analytics.find({ date: { year, month, day } });

    res.status(200).json(dailyAnalytics);
  } catch (error) {
    console.error("Error in getDailyAnalytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get analytics for all URLs created per month
exports.getMonthlyAnalytics = async (req, res) => {
  try {
    // Get current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed

    // Get analytics for this month
    const monthlyAnalytics = await Analytics.find({ date: { year, month } });

    res.status(200).json(monthlyAnalytics);
  } catch (error) {
    console.error("Error in getMonthlyAnalytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Other analytics related functions can be added here
