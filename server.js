require('dotenv').config();

const express = require('express');
const colors = require('colors');
const connectDB = require('./config/Database');

const app = express();
connectDB();
// Middleware setup
app.use(express.json());
// Routes setup

app.get('/', (req, res) => {
  console.log('Api');
  res.status(200).json({
    msg: 'Node server is running',
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: 'Page not found',
  });
});

const PORT = process.env.PORT || 8081;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bold.cyan);
});
