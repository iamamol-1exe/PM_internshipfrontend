const express = require("express");
const {
  registerAdminController,
  loginAdminController,
} = require("../controllers/admin.controller");
const { body } = require("express-validator");

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
  registerAdminController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("eamil must be correct"),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
  ],
  loginAdminController
);

module.exports = router;
