const { validationResult } = require("express-validator");
const dbUtils = require("../db/connectToDb");

module.exports.getAllInternships = async (req, res) => {
  try {
    const sql = "SELECT * FROM INTERNSHIPS";
    const rows = await dbUtils.query(sql);
    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
      error: err.message,
    });
  }
};

module.exports.addInternships = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // Destructure the body for clarity
  const { title, description, stipend, preferred_location, company } = req.body;
  let skills = req.body.skills; // Use 'let' as we might modify it

  // Convert skills to a string if it's an array
  if (Array.isArray(skills)) {
    skills = skills.join(", ");
  }

  let conn;
  try {
    // Get a connection from the pool
    conn = await dbUtils.getConnection();

    const sql =
      "INSERT INTO internships (title, description, skills, stipend, preferred_location, company) VALUES(?, ?, ?, ?, ?, ?)";

    const values = [
      title,
      description,
      skills,
      stipend,
      preferred_location,
      company,
    ];

    await conn.query(sql, values);

    return res
      .status(201)
      .json({ success: true, message: "Internship added successfully" });
  } catch (err) {
    console.error("Error occurred while adding internship:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the internship.",
      error: err.message,
    });
  } finally {
    // Release the connection back to the pool
    if (conn) {
      conn.release();
    }
  }
};
