const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
  } catch(err) {
    console.error('Failed to connect to MongoDB');
  }
};

module.exports = connectDB;