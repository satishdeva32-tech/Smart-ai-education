const mongoose = require('mongoose');
require('dotenv').config();

// Disable buffering so queries fail fast instead of hanging for 10s when DB is unreachable
mongoose.set('bufferCommands', false);

let cachedConnection = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.warn('No MongoDB URI provided; skipping DB connection.');
    return null;
  }

  try {
    cachedConnection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${cachedConnection.connection.host}`);
    return cachedConnection;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

module.exports = connectDB;

