const axiosService = require('../utils/axiosService');

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

