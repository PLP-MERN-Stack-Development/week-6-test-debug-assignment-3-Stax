// server/src/app.js
const express = require('express');
const cors = require('cors'); // Install this: pnpm install cors

const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorHandler');



const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser for JSON data

// Routes
app.use('/api/bugs', bugRoutes);

// Global Error Handling Middleware (must be last)
app.use(errorHandler);

module.exports = app