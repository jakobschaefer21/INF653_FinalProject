const mongoose = require('mongoose');

// connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Database connected');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;