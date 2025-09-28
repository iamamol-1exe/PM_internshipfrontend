const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/hashPassword");
const { query } = require("../db/connectToDb");
const jwt = require("jsonwebtoken");

module.exports.registerAdminController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const { fullname, email, password, userType } = req.body;
    // Check if required fields are present
    if (!fullname || !email || !password || !userType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate userType (assuming it should be 'admin' in this admin controller)
    if (userType !== "admin") {
      return res
        .status(400)
        .json({ error: "Invalid user type for admin registration" });
    }
    const existingUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUser = await query(existingUserQuery, [email]);
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }

    const hashedPassword = await hashPassword(password);
    const insertUserQuery = `
      INSERT INTO users (fullname, email, password, userType, created_at) 
      VALUES (?, ?, ?, ?, NOW())
    `;

    const result = await query(insertUserQuery, [
      fullname,
      email,
      hashedPassword,
      userType,
    ]);

    const token = jwt.sign(
      { id: result.insertId, email: email },
      process.env.JWT_SECRET || "amold",
      { expiresIn: "24h" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        id: result.insertId,
        fullname,
        email,
        userType,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.loginAdminController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const getUserQuery = "SELECT * FROM users WHERE email = ?";
    const users = await query(getUserQuery, [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];

    const bcrypt = require("bcrypt");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "amold",
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Remove password from user object
    delete user.password;

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: user,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
