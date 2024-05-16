const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortenedUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("URL", urlSchema);
