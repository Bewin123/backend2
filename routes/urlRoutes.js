const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

// Shorten a URL
router.post("/shorten", urlController.shortenURL);

// Redirect to original URL
router.get("/:shortURL", urlController.redirectURL);

// Get URL analytics
router.get("/analytics/:urlId", urlController.getAnalytics);

module.exports = router;
