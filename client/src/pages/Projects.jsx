import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/projects"
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://research-connect-jmno.onrender.com/api/saved-projects/save",
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     toast.success("Project Saved!");
    } catch (error) {
     toast.error(
  error.response?.data?.message ||
    "Failed to save project"
);
    }
  };

  const departments = [
    "All",
    ...new Set(projects.map((p) => p.department)),
  ];

  const filteredProjects = [...projects]
    .filter((project) =>
      project.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((project) =>
      department === "All"
        ? true
        : project.department === department
    )
    .sort((a, b) => {
      if (sortBy === "A-Z") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return 0;
    });

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold">
          Research Projects
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          {filteredProjects.length} Project(s) Found
        </p>

        {/* Filters */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          >
            {departments.map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          >
            <option>Newest</option>
            <option>A-Z</option>
          </select>

        </div>

        {/* Cards */}

        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Projects Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filter.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="h-40 bg-slate-200 rounded-lg mb-5"></div>

                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="text-blue-600 mt-2 font-medium">
                  {project.department}
                </p>

                <p className="text-gray-600 mt-3">
                  {project.description}
                </p>

                <div className="flex gap-3 mt-6">

                  <a
                    href={`/project/${project.id}`}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    View Details
                  </a>

                  <button
                    onClick={() =>
                      saveProject(project.id)
                    }
                    className="border px-5 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Save
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

export default Projects;