const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      serverSelectionTimeoutMS: 20000,
    });
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};


module.exports = connectDB;