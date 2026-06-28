const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const savedProjectRoutes = require("./routes/savedProjectRoutes");
const userRoutes = require("./routes/userRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/saved-projects", savedProjectRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("ResearchConnect Backend Running");
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});