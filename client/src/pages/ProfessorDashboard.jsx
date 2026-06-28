import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ProfessorDashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    activeProjects: 0,
    applications: 0,
    accepted: 0,
    pending: 0,
  });
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // 1. Fetch Projects (Token included)
      const projectRes = await axios.get(
        "https://research-connect-jmno.onrender.com/api/projects/my-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const myProjects = projectRes.data;
      setProjects(myProjects);

      // 2. Fetch Applications (ADDED Token here!)
      const appRes = await axios.get(
        "https://research-connect-jmno.onrender.com/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projectIds = myProjects.map((project) => project.id || project._id);

      const myApplications = appRes.data.filter((app) =>
        projectIds.includes(app.projectId)
      );

      setApplications(myApplications);

      setDashboardStats({
        activeProjects: myProjects.length,
        applications: myApplications.length,
        accepted: myApplications.filter((app) => app.status === "ACCEPTED").length,
        pending: myApplications.filter((app) => app.status === "PENDING").length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const stats = [
    { title: "Active Projects", value: dashboardStats.activeProjects },
    { title: "Applications", value: dashboardStats.applications },
    { title: "Accepted", value: dashboardStats.accepted },
    { title: "Pending", value: dashboardStats.pending },
  ];

  return (
    <>
      {/* Rendered the imported Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-bold">Professor Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Manage research opportunities and applications
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {stats.map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-3xl font-bold">{item.value}</h2>
              <p className="text-gray-500 mt-2">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Recent Projects</h2>
          <div className="bg-white rounded-xl shadow">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id || project._id} className="p-5 border-b">
                  <div className="font-semibold">{project.title}</div>
                  <div className="text-gray-500">{project.department}</div>
                </div>
              ))
            ) : (
              <div className="p-5 text-gray-500">No Projects Found</div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Recent Applications</h2>
          <div className="bg-white rounded-xl shadow">
            {applications.length > 0 ? (
              applications.slice(0, 5).map((app) => (
                <div key={app.id || app._id} className="p-5 border-b">
                  <div className="font-semibold">{app.student?.name}</div>
                  <div className="text-gray-500">
                    Applied for {app.project?.title}
                  </div>
                  <div
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === "ACCEPTED"
                        ? "bg-green-100 text-green-700"
                        : app.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 text-gray-500">No Applications Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessorDashboard;
