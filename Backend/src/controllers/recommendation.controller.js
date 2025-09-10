const axios = require("axios");
const { validationResult } = require("express-validator");

module.exports.getRecommendation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ Errors: errors });
  }
  const { jobRole, education, skills, location } = req.body;
 
  if (!jobRole || !education || !skills || !location) {
    return res.status(400).json({
      message:
        "Missing required fields. Please provide jobRole, education, skills, and location.",
    });
  }

  // Check if skills is an array
  if (!Array.isArray(skills)) {
    return res.status(400).json({
      message: "Skills must be provided as an array.",
    });
  }
  try {
    const url = process.env.RECOMMANDATION;
    let skillsText = skills.join(", ");
    const query = jobRole + " " + education + " " + skillsText + " " + location;
    const result = await axios.post(url, {
      query: query,
    });
    if (result.status === 200) {
      return res.status(200).json({ data: result.data });
    }
  } catch (error) {
    console.error("Error occured when the Getting Recommendation", error);
    return res
      .status(401)
      .json({ message: "Erorr ocuured at geting recommendation" });
  }
};
