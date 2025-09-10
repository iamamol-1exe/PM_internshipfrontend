const axios = require("axios");

module.exports.getRecommendation = async (req, res) => {
  const { jobRole, education, skils, location } = req.body;
  try {
    const url = process.env.RECOMMANDATION;
    const result = axios.post(url,{
      
    })

  } catch (error) {}
};
