import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FeaturedProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/projects"
      );

      // Show only the latest 6 projects
      setProjects(res.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-2">
        Featured Research Projects
      </h2>

      <p className="text-center text-gray-500 mb-10">
        Cutting-edge opportunities waiting for you
      </p>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500">
          No projects available.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <div className="h-40 bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-5xl">🔬</span>
              </div>

              <h3 className="font-bold text-lg">
                {project.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {project.department}
              </p>

              <p className="text-gray-600 mt-3 line-clamp-3">
                {project.description}
              </p>

              <Link
                to={`/project/${project.id}`}
                className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProjects;