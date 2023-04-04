const mongoose = require('mongoose');
const dev = require('.');

const connectDB = async () => {
  try{
    await mongoose.connect(dev.database.tvshowsUrl);
    console.log("Connected to DB!");
  } catch (error) {
    console.log(`Connection failed: ${error.message}`);
  }
}

module.exports = connectDB;