import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
  } catch(err) {
    console.error('Failed to connect to MongoDB');
  }
};