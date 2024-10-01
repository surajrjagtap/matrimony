// config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Options are no longer necessary in Mongoose 6+
      // But you can specify them if needed
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true, // Deprecated
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;




