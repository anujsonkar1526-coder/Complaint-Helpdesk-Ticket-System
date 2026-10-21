const mongoose = require("mongoose");

async function connectDB() {

    const uri = process.env.MONGO_URI;
    
    if (!uri) {
        console.error("MONGO_URI is not set. ");
        return;
    }
    try {
        await mongoose.connect(uri);

        console.log("MongoDB connected successfully");
    } catch (error) {

        console.error("MongoDB connection error:", error.message);
    }
}

module.exports = connectDB;