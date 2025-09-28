const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/hashPassword");
const { query } = require("../db/connectToDb");
const jwt = require("jsonwebtoken");

module.exports.userRegisterController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { fullname, email, password, userType } = req.body;

    if (!fullname || !email || !password || !userType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUser = await query(existingUserQuery, [email]);

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }

    const hashedPassword = await hashPassword(password);

    // Insert new user into database
    const insertUserQuery = `
      INSERT INTO users (fullname, email, password, userType, created_at) 
      VALUES (?, ?, ?, ?, NOW())
    `;

    const result = await query(insertUserQuery, [
      fullname,
      email,
      hashedPassword,
    ]);

    // Generate JWT token
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

module.exports.userLoginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const getUserQuery = "SELECT * FROM users WHERE email = ?";
    const users = await query(getUserQuery, [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];

    // Verify password (assuming you have a comparePassword utility function)
    const bcrypt = require("bcrypt");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "amold",
      { expiresIn: "24h" }
    );

    // Set cookie
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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.userLogoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getUserProfileController = async (req, res) => {
  try {
    // User is already attached to req by the authenticate middleware
    const user = { ...req.user };

    // Parse skills if it exists
    if (user.skills) {
      if (typeof user.skills === "string") {
        const skillsString = user.skills.trim();
        // Check if it looks like JSON (starts with [ and ends with ])
        if (skillsString.startsWith("[") && skillsString.endsWith("]")) {
          try {
            user.skills = JSON.parse(skillsString);
          } catch (error) {
            console.error("Error parsing JSON skills:", error);
            user.skills = [];
          }
        } else {
          // Treat as comma-separated string
          user.skills = skillsString
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0);
        }
      } else if (Array.isArray(user.skills)) {
        // Already an array, keep as is
        user.skills = user.skills;
      } else {
        user.skills = [];
      }
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      user: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateUserProfileController = async (req, res) => {
  try {
    const { fullname, university, location, highest_education, cgpa, skills } =
      req.body;
    const userId = req.user.id;

    // Build update query dynamically based on provided fields
    const updateFields = [];
    const updateValues = [];

    if (fullname) {
      updateFields.push("fullname = ?");
      updateValues.push(fullname);
    }

    if (university) {
      updateFields.push("university = ?");
      updateValues.push(university);
    }

    if (location) {
      updateFields.push("location = ?");
      updateValues.push(location);
    }

    if (highest_education) {
      updateFields.push("highest_education = ?");
      updateValues.push(highest_education);
    }

    if (cgpa) {
      updateFields.push("cgpa = ?");
      updateValues.push(cgpa);
    }

    if (skills) {
      updateFields.push("skills = ?");
      if (Array.isArray(skills)) {
        updateValues.push(JSON.stringify(skills));
      } else if (typeof skills === "string") {
        // Handle comma-separated string
        const skillsArray = skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
        updateValues.push(JSON.stringify(skillsArray));
      } else {
        updateValues.push(JSON.stringify([]));
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    updateValues.push(userId);
    const updateQuery = `UPDATE users SET ${updateFields.join(
      ", "
    )}, updated_at = NOW() WHERE id = ?`;

    await query(updateQuery, updateValues);

    // Get updated user data
    const getUserQuery =
      "SELECT id, fullname, email, userType, university, location, highest_education, cgpa, skills FROM users WHERE id = ?";
    const updatedUser = await query(getUserQuery, [userId]);

    // Parse skills back to array if it exists
    if (updatedUser[0].skills) {
      if (typeof updatedUser[0].skills === "string") {
        const skillsString = updatedUser[0].skills.trim();
        // Check if it looks like JSON (starts with [ and ends with ])
        if (skillsString.startsWith("[") && skillsString.endsWith("]")) {
          try {
            updatedUser[0].skills = JSON.parse(skillsString);
          } catch (error) {
            console.error("Error parsing JSON skills:", error);
            updatedUser[0].skills = [];
          }
        } else {
          // Treat as comma-separated string
          updatedUser[0].skills = skillsString
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0);
        }
      } else if (Array.isArray(updatedUser[0].skills)) {
        // Already an array, keep as is
        updatedUser[0].skills = updatedUser[0].skills;
      } else {
        updatedUser[0].skills = [];
      }
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



