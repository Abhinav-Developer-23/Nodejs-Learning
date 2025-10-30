const express = require('express');
const { connectDB } = require('./config/database');
const { sequelize } = require('./models');
const { startGrpcServer } = require('./grpc/departmentServer');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Connect to database and start both servers
const startServers = async () => {
  try {
    await connectDB();
    
    // Sync database models (create tables if they don't exist)
    // Set force: false to prevent dropping existing tables
    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Express server running on http://localhost:${PORT}`);
    });
    
    // Start gRPC server (in the same process)
    startGrpcServer();
    
  } catch (error) {
    console.error('Failed to start servers:', error);
    process.exit(1);
  }
};

startServers();

