const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const recommendationRoutes = require("./routes/recommendation.route");
const userRoutes = require("./routes/user.router");
const adminRoutes = require("./routes/admin.router");

const internshipRoutes = require("./routes/internship.route");

const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/recommend", recommendationRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is Online");
});

module.exports = app;
