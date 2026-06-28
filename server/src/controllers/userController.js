const prisma = require("../config/prisma");

// ============================
// Get Profile
// ============================
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ============================
// Update Profile
// ============================
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      department,
      year,
      cgpa,
      skills,
      researchInterests,
      linkedin,
      github,
      portfolio,
      bio,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name,
        phone,
        department,
        year,
        cgpa,
        skills,
        researchInterests,
        linkedin,
        github,
        portfolio,
        bio,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ============================
// Upload Resume
// ============================
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        resumeUrl: req.file.filename,
      },
    });

    res.json({
      message: "Resume uploaded successfully",
      resumeUrl: user.resumeUrl,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getStudentById = async (req, res) => {
  try {
    const student = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const savedProjects = await prisma.savedProject.count({
      where: {
        studentId,
      },
    });

    const appliedProjects = await prisma.application.count({
      where: {
        studentId,
      },
    });

    const totalProjects = await prisma.project.count();

    const recentApplications = await prisma.application.findMany({
      where: {
        studentId,
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    res.json({
      totalProjects,
      savedProjects,
      appliedProjects,
      recentApplications,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getProfessors = async (req, res) => {
  try {
    const professors = await prisma.user.findMany({
      where: {
        role: "PROFESSOR",
      },
      select: {
        id: true,
        name: true,
        department: true,
        bio: true,
      },
    });

    res.json(professors);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getProfessorById = async (req, res) => {
  try {
    const { id } = req.params;

    const professor = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        bio: true,
        researchInterests: true,
        linkedin: true,
        github: true,
        portfolio: true,
      },
    });

    if (!professor) {
      return res.status(404).json({
        message: "Professor not found",
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        professorId: id,
      },
      select: {
        id: true,
        title: true,
        department: true,
        description: true,
      },
    });

    res.json({
      professor,
      projects,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const deleteAccount = async (req, res) => {
  try {
    await prisma.savedProject.deleteMany({
      where: {
        studentId: req.user.id,
      },
    });

    await prisma.application.deleteMany({
      where: {
        studentId: req.user.id,
      },
    });

    await prisma.project.deleteMany({
      where: {
        professorId: req.user.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getProfessorProfile = async (req, res) => {
  try {
    const professor = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        projects: true,
      },
    });

    if (!professor) {
      return res.status(404).json({
        message: "Professor not found",
      });
    }

    res.json(professor);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
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
};