// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import URL and User models
const URL = require("./models/URL");
const User = require("./models/User");

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://bewinshaji01:bewin1302@cluster0.e6nzcye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

app.use("/auth", authRoutes);
app.use("/url", urlRoutes);
app.use("/analytics", analyticsRoutes);

// Route to get URLs data
app.get("/urls", async (req, res) => {
  try {
    const urls = await URL.find();
    const fullUrls = urls.map((url) => ({
      ...url.toObject(),
      fullUrl: `http://localhost:${process.env.PORT || 3000}/url/${url._id}`,
    }));
    res.send(createTable(fullUrls));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get Users data
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(createTable(users));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Function to create HTML table
function createTable(data) {
  let tableHtml = `<table border="1">
                    <thead>
                      <tr>`;
  const keys = Object.keys(data[0]);
  keys.forEach((key) => {
    tableHtml += `<th>${key}</th>`;
  });
  tableHtml += `</tr></thead><tbody>`;
  data.forEach((item) => {
    tableHtml += `<tr>`;
    keys.forEach((key) => {
      tableHtml += `<td>${item[key]}</td>`;
    });
    tableHtml += `</tr>`;
  });
  tableHtml += `</tbody></table>`;
  return tableHtml;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
