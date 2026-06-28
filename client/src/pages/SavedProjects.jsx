import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function SavedProjects() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]);

  useEffect(() => {
    fetchSavedProjects();
    fetchMyApplications();
  }, []);

  const fetchSavedProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/saved-projects/my-saved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/applications/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppliedProjects(
        res.data.map((app) => app.projectId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const applyProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://research-connect-jmno.onrender.com/api/applications/apply",
        {
          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application Submitted!");

      fetchMyApplications();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to Apply"
      );
    }
  };

  const removeProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://research-connect-jmno.onrender.com/api/saved-projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSavedProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">
          Saved Projects
        </h1>

        {savedProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-gray-500">
            No Saved Projects
          </div>
        ) : (
          <div className="space-y-6">
            {savedProjects.map((saved) => (
              <div
                key={saved.id}
                className="bg-white rounded-2xl shadow p-6"
              >
                <h2 className="text-2xl font-bold">
                  {saved.project.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {saved.project.department}
                </p>

                <p className="mt-4 text-gray-600">
                  {saved.project.description}
                </p>

                <div className="flex gap-4 mt-6 flex-wrap">

                  <Link
                    to={`/project/${saved.project.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    View Details
                  </Link>

                  {appliedProjects.includes(
                    saved.project.id
                  ) ? (
                    <button
                      disabled
                      className="bg-green-100 text-green-700 px-5 py-2 rounded-lg"
                    >
                      Applied ✓
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        applyProject(saved.project.id)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      Apply Now
                    </button>
                  )}

                  <button
                    onClick={() =>
                      removeProject(saved.project.id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedProjects;