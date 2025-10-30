const axiosService = require('../utils/axiosService');

// Example curl: curl -X GET http://localhost:3000/api/external
const getExternalData = async (req, res) => {
  try {
    const data = await axiosService.fetchExternalData();
    res.json({
      message: 'Data fetched using Axios',
      data: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExternalData
};

