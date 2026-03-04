// Express Server
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
