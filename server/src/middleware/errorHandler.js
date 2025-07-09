// server/src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong on the server.';

  // Handle Mongoose specific errors if needed
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message; // Mongoose validation errors are quite descriptive
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    // Invalid ObjectId format
    statusCode = 400;
    message = 'Invalid ID format.';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err.stack : {}, // Only send stack in dev
  });
};

module.exports = errorHandler;