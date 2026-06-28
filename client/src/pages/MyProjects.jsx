import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/projects/my-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };
const deleteProject = async (projectId) => {
  try {
    const token =
      localStorage.getItem("token");

    await axios.delete(
      `https://research-connect-jmno.onrender.com/api/projects/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Project Deleted");

    fetchMyProjects();
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );
  }
};
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            My Projects
          </h1>

          <a
            href="/create-project"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Create Project
          </a>
        </div>

        <div className="space-y-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    {project.title}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Department:{" "}
                    {project.department}
                  </p>

                  <p className="mt-2 text-gray-500">
                    Applications:{" "}
                    {project.applications?.length || 0}
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
                    ACTIVE
                  </span>

                  <a
  href={`/edit-project/${project.id}`}
  className="border px-4 py-2 rounded-lg"
>
  Edit
</a>

                 <button
  onClick={() =>
    deleteProject(project.id)
  }
  className="bg-red-600 text-white px-4 py-2 rounded-lg"
>
  Delete
</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center mt-6">
            No Projects Created Yet
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProjects;