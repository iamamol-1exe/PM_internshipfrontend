const jwt = require("jsonwebtoken");
const { query } = require("../db/connectToDb"); // Import the query function from connectToDb

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    console.log("Extracted token:", token);

    if (!token) {
      console.warn("No token found in cookie or header");
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const secret = process.env.JWT_SECRET || "amold";
    const decoded = jwt.verify(token, secret);

    const getUserQuery = "SELECT * FROM users WHERE id = ?";

    // Use the async query function instead of callback-based connection.query
    const results = await query(getUserQuery, [decoded.id]);

    if (!results || results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    // Add user to request object without the password
    const user = results[0];
    delete user.password;
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authenticate;
