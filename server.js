require('dotenv').config();

const express = require('express');
const session = require('express-session');

const connectDB = require('./config/Database');

const Router = require('./routes/index');

const passport = require('./config/Passport');

const app = express();
connectDB();

// Middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Qwerty@123',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
// Routes setup

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Node server is running',
  });
});

Router(app);

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
