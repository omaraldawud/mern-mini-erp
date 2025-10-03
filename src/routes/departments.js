const express = require("express");
const router = express.Router();

// Temporary route until we build the Department model
router.get("/", (req, res) => {
  res.json({ message: "Departments route - coming soon!" });
});

module.exports = router; // ✅ Make sure to export the router
