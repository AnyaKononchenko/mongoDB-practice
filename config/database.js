const mongoose = require("mongoose");
const dev = require("./dev");

const connectDB = async () => {
  try {
    await mongoose.connect(dev.databaseUrl);
    console.log("Successfully connected to database!");
  } catch (error) {
    console.log(`Could not connect to database: ${error.message}`)
  }
}

module.exports = connectDB;