import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Settings() {
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changePassword = async () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return alert("Please fill all fields");
    }

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      return alert("New passwords do not match");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "https://research-connect-jmno.onrender.com/api/users/change-password",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update password"
      );
    }
  };

  const deleteAccount = async (req, res) => {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // STUDENT
    if (user.role === "STUDENT") {
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

      await prisma.user.delete({
        where: {
          id: req.user.id,
        },
      });
    }

    // PROFESSOR
    else {
      const projects = await prisma.project.findMany({
        where: {
          professorId: req.user.id,
        },
        select: {
          id: true,
        },
      });

      const projectIds = projects.map(
        (project) => project.id
      );

      // Delete saved projects related to professor's projects
      await prisma.savedProject.deleteMany({
        where: {
          projectId: {
            in: projectIds,
          },
        },
      });

      // Delete applications on professor's projects
      await prisma.application.deleteMany({
        where: {
          projectId: {
            in: projectIds,
          },
        },
      });

      // Delete professor's projects
      await prisma.project.deleteMany({
        where: {
          professorId: req.user.id,
        },
      });

      // Delete professor
      await prisma.user.delete({
        where: {
          id: req.user.id,
        },
      });
    }

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

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Header */}
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account settings
        </p>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow mt-8 p-8">

          <h2 className="text-2xl font-bold mb-2">
            🔒 Change Password
          </h2>

          <p className="text-gray-500 mb-8">
            Update your password to keep your account secure.
          </p>

          <div className="space-y-5">

            <div>
              <label className="font-medium">
                Current Password
              </label>

              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Enter current password"
                className="w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium">
                New Password
              </label>

              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Enter new password"
                className="w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium">
                Confirm New Password
              </label>

              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm new password"
                className="w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={changePassword}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Update Password
            </button>

          </div>

        </div>

        {/* Danger Zone */}
        <div className="border border-red-300 bg-red-50 rounded-2xl mt-8 p-8">

          <h2 className="text-2xl font-bold text-red-600">
            ⚠️ Danger Zone
          </h2>

          <p className="text-gray-700 mt-2">
            Permanently delete your account. This action cannot be undone.
          </p>

          <button
            onClick={deleteAccount}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Delete Account
          </button>

        </div>

      </div>
    </div>
  );
}

export default Settings;