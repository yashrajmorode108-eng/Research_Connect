import { useEffect, useState } from "react";
import axios from "axios";
import ProfessorNavbar from "../components/ProfessorNavbar";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const [appRes, projectRes] = await Promise.all([
        // 1. Added Authorization header to fetch all applications securely
        axios.get("https://research-connect-jmno.onrender.com/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("https://research-connect-jmno.onrender.com/api/projects/my-projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const myProjectIds = projectRes.data.map((project) => project.id || project._id);

      const filteredApplications = appRes.data.filter((app) =>
        myProjectIds.includes(app.projectId)
      );

      // 2. Chronological sorting so newest applications appear at the top
      filteredApplications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setApplications(filteredApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      // 3. Fixed the template literal backticks and added the Authorization header
      await axios.patch(
        `https://research-connect-jmno.onrender.com/api/applications/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Application ${status}`);
      fetchApplications(); // Refreshes the list to show the new status
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <>
      {/* 4. Rendered the imported ProfessorNavbar */}
      <ProfessorNavbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">Applications Management</h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-gray-500">
            No applications found.
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id || app._id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  
                  {/* Student & Project Details */}
                 <div className="flex-1">
  <h2 className="text-2xl font-bold">
    {app.student?.name}
  </h2>

  <p className="text-gray-500">
    {app.student?.email}
  </p>

  <p className="mt-2">
    📞 {app.student?.phone || "Not Provided"}
  </p>

  <p>
    🎓 Department:{" "}
    {app.student?.department || "N/A"}
  </p>

  <p>
    📅 Year:{" "}
    {app.student?.year || "N/A"}
  </p>

  <p>
    ⭐ CGPA:{" "}
    {app.student?.cgpa || "N/A"}
  </p>

  <p className="mt-3">
    <strong>Project:</strong>{" "}
    {app.project?.title}
  </p>

  <p className="mt-2">
    <strong>Status:</strong>{" "}
    <span
      className={`font-semibold ${
        app.status === "ACCEPTED"
          ? "text-green-600"
          : app.status === "REJECTED"
          ? "text-red-600"
          : "text-yellow-600"
      }`}
    >
      {app.status}
    </span>
  </p>

  <p className="mt-2 text-gray-500 text-sm">
    Applied On:{" "}
    {new Date(app.createdAt).toLocaleDateString()}
  </p>

  <div className="mt-5">
    <h3 className="font-semibold">
      Skills
    </h3>

    <p>
      {app.student?.skills || "Not Added"}
    </p>
  </div>

  <div className="mt-5">
    <h3 className="font-semibold">
      Research Interests
    </h3>

    <p>
      {app.student?.researchInterests ||
        "Not Added"}
    </p>
  </div>

  <div className="flex flex-wrap gap-3 mt-5">

    {app.student?.github && (
      <a
        href={app.student.github}
        target="_blank"
        rel="noreferrer"
        className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
      >
        GitHub
      </a>
    )}

    {app.student?.linkedin && (
      <a
        href={app.student.linkedin}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-100 px-3 py-2 rounded-lg hover:bg-blue-200"
      >
        LinkedIn
      </a>
    )}

    {app.student?.portfolio && (
      <a
        href={app.student.portfolio}
        target="_blank"
        rel="noreferrer"
        className="bg-purple-100 px-3 py-2 rounded-lg hover:bg-purple-200"
      >
        Portfolio
      </a>
    )}

    {app.student?.resumeUrl && (
      <a
        href={`https://research-connect-jmno.onrender.com/uploads/${app.student.resumeUrl}`}
        target="_blank"
        rel="noreferrer"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        📄 View Resume
      </a>
    )}

  </div>

  {app.student?.bio && (
    <div className="mt-6">
      <h3 className="font-semibold">
        About Student
      </h3>

      <p className="text-gray-700">
        {app.student.bio}
      </p>
    </div>
  )}
</div>

                  {/* Action Buttons / Status Badges */}
                  <div className="flex flex-col gap-3 min-w-[120px]">
                    {app.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => updateStatus(app.id || app._id, "ACCEPTED")}
                          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg font-medium shadow-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(app.id || app._id, "REJECTED")}
                          className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg font-medium shadow-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {app.status === "ACCEPTED" && (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center font-medium border border-green-200">
                        Accepted
                      </span>
                    )}

                    {app.status === "REJECTED" && (
                      <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center font-medium border border-red-200">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ApplicationsManagement;