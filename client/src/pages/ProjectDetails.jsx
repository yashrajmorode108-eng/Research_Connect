import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `https://research-connect-jmno.onrender.com/api/projects/${id}`
      );

      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <Loader />
    </div>
  );
}
const applyToProject = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "https://research-connect-jmno.onrender.com/api/applications/apply",
      {
        projectId: project.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   toast.success("Application Submitted!");
  } catch (error) {
    console.log(error);

    toast.error(
  error.response?.data?.message ||
  "Failed to Apply"
);
  }
};
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="h-72 bg-slate-200"></div>

          <div className="p-8">
            <h1 className="text-4xl font-bold">
              {project.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {project.department}
            </p>

            <div className="flex gap-6 mt-6">
              <div>
                <strong>
                  Project ID:
                </strong>

                <p>
                  {project.id.slice(0, 8)}
                </p>
              </div>

              <div>
                <strong>
                  Created:
                </strong>

                <p>
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-3">
                Project Description
              </h2>

              <p className="text-gray-600">
                {project.description}
              </p>
            </div>
<div className="grid md:grid-cols-2 gap-6 mt-10">

  <div className="bg-slate-100 rounded-xl p-5">
    <h3 className="font-semibold">
      Required Skills
    </h3>

    <p className="text-gray-600 mt-2">
      {project.requiredSkills || "Not Specified"}
    </p>
  </div>

  <div className="bg-slate-100 rounded-xl p-5">
    <h3 className="font-semibold">
      Eligibility
    </h3>

    <p className="text-gray-600 mt-2">
      {project.eligibility || "Open to all"}
    </p>
  </div>

  <div className="bg-slate-100 rounded-xl p-5">
    <h3 className="font-semibold">
      Positions Available
    </h3>

    <p className="text-gray-600 mt-2">
      {project.positions || "Not Mentioned"}
    </p>
  </div>

  <div className="bg-slate-100 rounded-xl p-5">
    <h3 className="font-semibold">
      Application Deadline
    </h3>

    <p className="text-gray-600 mt-2">
      {project.deadline
        ? new Date(
            project.deadline
          ).toLocaleDateString()
        : "No Deadline"}
    </p>
  </div>

</div>
            <button
  onClick={applyToProject}
  className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-xl"
>
  Apply Now
</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;