const prisma = require("../config/prisma");

const createProject = async (req, res) => {
  try {
    const { title, description, department } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        department,
        professorId: req.user.id,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getProjectById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const project =
      await prisma.project.findUnique({
        where: {
          id,
        },
      });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getApplicants = async (req, res) => {
  try {
    const { projectId } = req.params;

    const applicants = await prisma.application.findMany({
      where: {
        projectId,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    res.json(applicants);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMyProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        professorId: req.user.id,
      },
    });

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, department } =
      req.body;

    const project =
      await prisma.project.findUnique({
        where: { id },
      });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.professorId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updatedProject =
      await prisma.project.update({
        where: { id },
        data: {
          title,
          description,
          department,
        },
      });

    res.json(updatedProject);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the project
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. Check authorization
    if (project.professorId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 3. Execute deletions inside a transaction
    await prisma.$transaction([
      prisma.application.deleteMany({
        where: { projectId: id },
      }),
      prisma.project.delete({
        where: { id },
      }),
    ]);

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getProfessorDashboard = async (req, res) => {
  try {
    const professorId = req.user.id;

    // Total projects created by professor
    const totalProjects = await prisma.project.count({
      where: {
        professorId,
      },
    });

    // Applications received for professor's projects
    const applications = await prisma.application.findMany({
      where: {
        project: {
          professorId,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const totalApplications = applications.length;

    const accepted = applications.filter(
      (a) => a.status === "ACCEPTED"
    ).length;

    const pending = applications.filter(
      (a) => a.status === "PENDING"
    ).length;

    const rejected = applications.filter(
      (a) => a.status === "REJECTED"
    ).length;

    res.json({
      totalProjects,
      totalApplications,
      accepted,
      pending,
      rejected,
      recentApplications: applications,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getHomeStats = async (req, res) => {
  try {
    const totalProjects = await prisma.project.count();

    const totalProfessors = await prisma.user.count({
      where: {
        role: "PROFESSOR",
      },
    });

    const totalStudents = await prisma.user.count({
      where: {
        role: "STUDENT",
      },
    });

    res.json({
      totalProjects,
      totalProfessors,
      totalStudents,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createProject,
  getProjects,
  getApplicants,
  getMyProjects,
  getProjectById,
  deleteProject,
  updateProject,
  getProfessorDashboard,
  getHomeStats,
};