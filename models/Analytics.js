const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  url: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "URL",
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  date: {
    year: Number,
    month: Number,
    day: Number,
  },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
