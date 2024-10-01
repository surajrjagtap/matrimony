// require('dotenv').config();
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000; 

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// console.log(`Using PORT: ${process.env.PORT}`);
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });



// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Matrimony App API is running...');
});

// Error Handling Middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
