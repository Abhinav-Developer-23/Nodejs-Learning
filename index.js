const express = require('express');
const { connectDB } = require('./config/database');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Connect to database and sync models
const startServer = async () => {
  try {
    await connectDB();
    
    // Sync database models (create tables if they don't exist)
    // Set force: false to prevent dropping existing tables
    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

