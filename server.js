const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Basic GET route for the homepage
app.get("/", (req, res) => {
  res.send("Hello from the Express server!");
});

// A simple API endpoint to return JSON data
app.get("/api/data", (req, res) => {
  const data = [
    { id: 1, name: "Palos Healthcare" },
    { id: 2, name: "Other Location" },
  ];
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
