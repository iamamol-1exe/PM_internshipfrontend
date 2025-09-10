const express = require("express");
const internshipController = require("../controllers/internship.controller");

const { body } = require("express-validator");
const router = express.Router();

router.get("/getInterShips", internshipController.getAllInternships);

router.post(
  "/addInternship",
  [
    // Add validators for body parameters here
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required"),
    body("skills").isArray(),
    body("stipend").isNumeric().withMessage("Stipend must be a number"),
  ],
  internshipController.addInternships
);

module.exports = router;
