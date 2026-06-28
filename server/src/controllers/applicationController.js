const prisma = require("../config/prisma");

const applyToProject = async (req, res) => {
  try {
    const { projectId } = req.body;

const studentId = req.user.id;
    const existingApplication =
      await prisma.application.findFirst({
        where: {
          projectId,
          studentId,
        },
      });

    if (existingApplication) {
      return res.status(400).json({
        message:
          "You have already applied to this project",
      });
    }

    const application =
      await prisma.application.create({
        data: {
          projectId,
          studentId,
        },
      });

    res.status(201).json(application);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application =
      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status,
        },
      });

    res.json(application);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        project: {
          professorId: req.user.id,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            department: true,
            year: true,
            cgpa: true,
            skills: true,
            researchInterests: true,
            github: true,
            linkedin: true,
            portfolio: true,
            resumeUrl: true,
            bio: true,
          },
        },
        project: true,
      },
    });

    res.json(applications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getMyApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        studentId: req.user.id,
      },
      include: {
        project: {
          include: {
            professor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(applications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  applyToProject,
  updateApplicationStatus,
  getApplications,
  getMyApplications,
};