require('dotenv').config();
const express = require('express');
const session = require('express-session');

const colors = require('colors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/Database');
const cors = require('cors');

// Routes imports
const SwagerTestRoute = require('./routes/SwagerTestRoute');

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
// Enable CORS
app.use(cors());

// Morgan logging setup
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});
app.use(morgan('combined', { stream: logStream }));
app.use(morgan('dev'));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DevHub API',
      version: '1.0.0',
      description: 'API documentation for DevHub',
      contact: {
        name: 'Usama Aamir',
        url: 'https://github.com/usama7365/Devhub-Backend',
      },
    },
    servers: [{ url: 'http://localhost:8080' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes setup

app.use('/v1/api', SwagerTestRoute);

app.get('/', (req, res) => {
  return res.status(200).json({
    msg: 'Node server is running',
  });
  res.status(200).json({ msg: 'Node server is running' });
});

Router(app);

app.use((req, res) => {
  res.status(404).json({ success: false, msg: 'Page not found' });
});

const PORT = process.env.PORT || 8081;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bold.cyan);
  console.log(
    `Swagger Docs available at http://localhost:${PORT}/api-docs`.bold.yellow
  );
});
