const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getApplicants,
  getMyProjects,
  getProjectById,
  deleteProject,
  updateProject,
  getProfessorDashboard,
getHomeStats,
} = require("../controllers/projectController");

// Professor Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  getProfessorDashboard
);

// Professor Projects
router.get(
  "/my-projects",
  authMiddleware,
  getMyProjects
);

// Create Project
router.post(
  "/create",
  authMiddleware,
  createProject
);

// Applicants of a Project
router.get(
  "/:projectId/applicants",
  authMiddleware,
  getApplicants
);

// All Projects
router.get("/", getProjects);
router.get(
  "/home-stats",
  getHomeStats
);
// Single Project
router.get("/:id", getProjectById);

// Update Project
router.put(
  "/:id",
  authMiddleware,
  updateProject
);

// Delete Project
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

module.exports = router;