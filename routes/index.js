const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Basic route
router.get('/', (req, res) => {
  res.json({ 
    message: 'Express server is running!',
    packages: {
      express: 'installed',
      axios: 'installed',
      sequelize: 'installed'
    }
  });
});

// External API route
router.get('/api/external', apiController.getExternalData);

// Employee routes
router.use('/api/employees', require('./employees'));

// Department routes
router.use('/api/departments', require('./departments'));

module.exports = router;

