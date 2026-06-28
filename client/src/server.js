const express = require("express");
const cors = require("cors");
const userRoutes =
  require("./routes/userRoutes");
const app = express();
const savedProjectRoutes =
  require("./routes/savedProjectRoutes");
  
app.use(cors());
app.use(express.json());
app.use(
  "/api/saved-projects",
  savedProjectRoutes
);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("ResearchConnect Backend Running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});