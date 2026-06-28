const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  applyToProject,
  updateApplicationStatus,
  getApplications,
  getMyApplications,
} = require("../controllers/applicationController");

// Student applies to a project
router.post(
  "/apply",
  authMiddleware,
  applyToProject
);

// Professor updates application status
router.patch(
  "/:applicationId",
  authMiddleware,
  updateApplicationStatus
);

// Student's own applications
router.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);

// Professor views applications
router.get(
  "/",
  authMiddleware,
  getApplications
);

module.exports = router;