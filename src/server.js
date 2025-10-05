require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/employees", require("./routes/core/employees"));
app.use("/api/departments", require("./routes/core/departments"));
app.use("/api/hr/attendance", require("./routes/hr/attendance"));
app.use("/api/hr/leaves", require("./routes/hr/leaves"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "MercuryERP HR Module",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Database connection with better error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed");
  process.exit(0);
});

// Start server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 MercuryERP Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  });

  return server;
};

// Only start server if this file is run directly (not when testing)
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer }; // For testing
