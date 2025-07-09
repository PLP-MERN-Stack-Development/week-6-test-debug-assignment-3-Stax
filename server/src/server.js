// server/src/server.js
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

console.log('1. Starting server.js script...'); // ADD THIS LINE
dotenv.config(); // Load environment variables
console.log('2. dotenv.config() called.'); // ADD THIS LINE

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('3. PORT:', PORT); // ADD THIS LINE
console.log('4. MONGO_URI:', MONGO_URI ? '***** (present)' : 'NOT DEFINED'); // ADD THIS LINE

if (!MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file. Exiting.'); // This line should print if MONGO_URI is missing
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('5. MongoDB connected successfully'); // ADD THIS LINE
    // Start the server
    app.listen(PORT, () => {
      console.log(`6. Server running on port ${PORT}`); // ADD THIS LINE
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

console.log('7. End of server.js script, awaiting connection...'); // ADD THIS LINE