const prisma = require("../config/prisma");

const saveProject = async (req, res) => {
  console.log("========== SAVE PROJECT ==========");
  console.log("Request Body:", req.body);
  console.log("Logged User:", req.user);
  console.log("Prisma Model:", prisma.savedProject);

  try {
    const { projectId } = req.body;

    console.log("Project ID:", projectId);

    const existing = await prisma.savedProject.findFirst({
      where: {
        studentId: req.user.id,
        projectId,
      },
    });

    console.log("Existing Saved:", existing);

    if (existing) {
      return res.status(400).json({
        message: "Project already saved",
      });
    }

    const saved = await prisma.savedProject.create({
      data: {
        studentId: req.user.id,
        projectId,
      },
    });

    console.log("Saved Successfully:", saved);

    res.status(201).json(saved);
  } catch (error) {
    console.error("SAVE PROJECT ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getSavedProjects = async (req, res) => {
  try {
    console.log("========== GET SAVED PROJECTS ==========");
    console.log("User:", req.user);

    const savedProjects = await prisma.savedProject.findMany({
      where: {
        studentId: req.user.id,
      },
      include: {
        project: true,
      },
    });

    console.log(savedProjects);

    res.json(savedProjects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const removeSavedProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    await prisma.savedProject.deleteMany({
      where: {
        studentId: req.user.id,
        projectId,
      },
    });

    res.json({
      message: "Project removed",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveProject,
  getSavedProjects,
  removeSavedProject,
};