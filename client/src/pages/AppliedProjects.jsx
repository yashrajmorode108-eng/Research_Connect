import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AppliedProjects() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
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

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Applied Projects
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            You haven't applied to any projects yet.
          </div>
        ) : (
          <div className="space-y-5">

            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-xl font-bold">
                      {app.project.title}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {app.project.professor.name}
                    </p>

                    <p className="text-sm mt-2">
                      Applied on{" "}
                      {new Date(
                        app.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-medium ${getBadgeColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default AppliedProjects;