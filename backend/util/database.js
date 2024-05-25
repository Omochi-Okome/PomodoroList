const mongodb = require('mongodb');
const mongoose = require('mongoose')

let _db;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log('Connected to MongoDB');
    } catch(err) {
        console.log('Error')
    }
};

module.exports = connectDB;