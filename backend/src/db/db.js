const mongoose = require('mongoose');
const scheduleExpiryJob = require('../jobs/expiryChecker');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
        });
        console.log('MongoDB connected');
        scheduleExpiryJob();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;