const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  saveProject,
  getSavedProjects,
  removeSavedProject,
} = require(
  "../controllers/savedProjectController"
);

router.post(
  "/save",
  authMiddleware,
  saveProject
);

router.get(
  "/my-saved",
  authMiddleware,
  getSavedProjects
);

router.delete(
  "/:projectId",
  authMiddleware,
  removeSavedProject
);

module.exports = router;