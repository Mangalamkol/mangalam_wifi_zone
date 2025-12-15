const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error("[DB] ERROR: Missing MONGODB_URI environment variable.");
      return;
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[DB] MongoDB connected successfully.");
  } catch (error) {
    console.error("[DB] ERROR connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;