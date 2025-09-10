const express = require("express");
const recommendationController = require("../controllers/recommendation.controller");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    body("jobRole").notEmpty().withMessage("Job role is required"),
    body("education").notEmpty().withMessage("Education is required"),
    body("skills").isArray().withMessage("Skills should be an array"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  recommendationController.getRecommendation
);

module.exports = router;
