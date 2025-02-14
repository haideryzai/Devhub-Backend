const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log("MongoDB Connected successfully".brightWhite.bold);
  } catch (error) {
    console.error("Error connecting to MongoDB:".red.bold, error);
    process.exit(1);
  }
};

module.exports = connectDB;
