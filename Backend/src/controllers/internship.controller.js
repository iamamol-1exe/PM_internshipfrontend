const { validationResult } = require("express-validator");
const connectToDb = require("../db/connectToDb");
const { connection } = require("../server");

module.exports.getAllInternships = async (req, res) => {
  try {
    const conn = await connectToDb.connectToDb();
    if (!conn) {
      return res
        .status(500)
        .json({ success: false, message: "Database connection failed" });
    }
    const sql = "SELECT * FROM INTERNSHIPS";
    const [rows] = await conn.query(sql);
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

// It's a best practice to manage your database connection with a pool
// This should be initialized once when your application starts.
// For example, in your main server file (e.g., app.js or index.js):
// const dbPool = require('./config/database'); // Assuming you create a pool utility

module.exports.addInternships = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // Destructure the body for clarity
  const { title, description, stipend, preferred_location } = req.body;
  let skills = req.body.skills; // Use 'let' as we might modify it

  // FIX 1: Convert skills to a string *before* using it in the query
  if (Array.isArray(skills)) {
    skills = skills.join(", ");
  }

  // FIX 2: It's better to get a connection from a pool and release it
  let conn; // Define connection outside try to access it in finally
  try {
    // Assuming connectToDb is now a pool from which you get a connection
    conn = await connectToDb.connectToDb();

    const sql =
      "INSERT INTO internships (title, description, skills, stipend, preferred_location) VALUES(?, ?, ?, ?, ?)";

    // Use the processed 'skills' variable here
    const values = [title, description, skills, stipend, preferred_location];

    await conn.query(sql, values);

    return res
      .status(201)
      .json({ success: true, message: "Internship added successfully" });
  } catch (err) {
    console.error("Error occurred while adding internship:", err);
    // FIX 3: Provide a clearer error message
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the internship.",
      error: err.message,
    });
  } finally {
    // FIX 4: CRITICAL - Always release the connection back to the pool
    if (conn) {
      conn.release();
    }
  }
};
