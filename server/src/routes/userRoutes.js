const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getProfile,
  updateProfile,
  uploadResume,
  getStudentById,
  getStudentDashboard,
  getProfessors,
  getProfessorById,
  changePassword,
  deleteAccount,
  getProfessorProfile,

} = require("../controllers/userController");

router.get(
  "/profile",
  authMiddleware,
  getProfile
);
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);
router.get(
  "/dashboard",
  authMiddleware,
  getStudentDashboard
);
router.get(
  "/dashboard",
  authMiddleware,
  getStudentDashboard
);
router.get(
  "/professors",
  authMiddleware,
  getProfessors
);
router.get(
  "/professor/:id",
  getProfessorProfile
);
router.delete(
  "/delete-account",
  authMiddleware,
  deleteAccount
);
router.get(
  "/professor/:id",
  authMiddleware,
  getProfessorById
);
router.get(
  "/:id",
  authMiddleware,
  getStudentById
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

module.exports = router;