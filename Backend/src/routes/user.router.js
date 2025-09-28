const express = require("express");
const { body } = require("express-validator");
const {
  userRegisterController,
  userLoginController,
  userLogoutController,
  getUserProfileController,
  updateUserProfileController,
} = require("../controllers/user.controller");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("fullname")
      .isString()
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 3 characters"),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters"),
    body("email").isEmail().withMessage("eamil must be correct"),
    body("userType")
      .isString()
      .isLength({ min: 3 })
      .withMessage("eamil must be correct"),
  ],
  userRegisterController
);

router.post(
  "/login",
  [
    body("email").trim().isEmail(),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage({ mess: " it must have the three characters " }),
  ],
  userLoginController
);

router.get("/logout", userLogoutController);

router.get("/profile", authenticate, getUserProfileController);

router.post(
  "/updateProfile", 
  [
    body("fullname")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("university")
      .optional()
      .isString()
      .trim()
      .withMessage("University must be a valid string"),
    body("location")
      .optional()
      .isString()
      .trim()
      .withMessage("Location must be a valid string"),
    body("highest_education")
      .optional()
      .isString()
      .trim()
      .withMessage("Highest education must be a valid string"),
    body("cgpa")
      .optional()
      .isFloat({ min: 0, max: 10 })
      .withMessage("CGPA must be a valid number between 0 and 10"),
    body("skills")
      .optional()
      .isArray()
      .withMessage("Skills must be an array")
  ], 
  authenticate, 
  updateUserProfileController
);

module.exports = router;
