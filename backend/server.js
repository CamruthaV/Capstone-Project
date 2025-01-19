// filepath: backend/server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config({ path: "./config/.env" });

const app = express();
connectDB();

app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));