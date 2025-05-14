const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection options
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        // Try to connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://iftiajul99:JP6zB2ohnjXvBIGU@cluster0.jl0cfl1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', options);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Add event listeners for connection status
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Don't exit the process, let the application handle the error
        return false;
    }
};

module.exports = connectDB; 