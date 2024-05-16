const URL = require("../models/URL");
const Analytics = require("../models/Analytics");

// Shorten a URL
exports.shortenURL = async (req, res) => {
  try {
    const { originalURL } = req.body;

    // Create a new shortened URL
    const newURL = new URL({ originalURL });
    await newURL.save();

    res.status(201).json({ shortURL: newURL.shortURL });
  } catch (error) {
    console.error("Error in shortenURL:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Redirect to original URL
exports.redirectURL = async (req, res) => {
  try {
    const shortURL = req.params.shortURL;

    // Find the original URL by short URL
    const url = await URL.findOne({ shortURL });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Increment URL click count
    await Analytics.updateOne(
      { url: url._id },
      { $inc: { clickCount: 1 } },
      { upsert: true }
    );

    // Redirect to original URL
    res.redirect(url.originalURL);
  } catch (error) {
    console.error("Error in redirectURL:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get URL analytics
exports.getAnalytics = async (req, res) => {
  try {
    const { urlId } = req.params;

    // Find analytics for the given URL
    const analytics = await Analytics.findOne({ url: urlId });
    if (!analytics) {
      return res.status(404).json({ message: "Analytics not found" });
    }

    res.status(200).json(analytics);
  } catch (error) {
    console.error("Error in getAnalytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Other URL related functions can be added here
