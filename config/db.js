const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    const DB = process.env.DB_URI;
    await mongoose.connect(DB);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database: " + error.message);
  }
};

// Call the function to connect to the database
connectToDatabase();
