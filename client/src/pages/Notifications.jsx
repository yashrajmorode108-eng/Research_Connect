import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Fallback for MongoDB _id just in case
      const userId = user.id || user._id;

      const appRes = await axios.get("https://research-connect-jmno.onrender.com/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const projectRes = await axios.get("https://research-connect-jmno.onrender.com/api/projects");

      let data = [];

      // STUDENT NOTIFICATIONS
      if (user.role === "STUDENT") {
        const myApplications = appRes.data.filter(
          (app) => app.studentId === userId
        );

        const applicationNotifications = myApplications.map((app) => ({
          id: app.id || app._id,
          title:
            app.status === "ACCEPTED"
              ? "Application Accepted"
              : app.status === "REJECTED"
              ? "Application Rejected"
              : "Application Under Review",
          message:
            app.status === "ACCEPTED"
              ? `Your application for ${app.project.title} has been accepted.`
              : app.status === "REJECTED"
              ? `Your application for ${app.project.title} has been rejected.`
              : `Your application for ${app.project.title} is under review.`,
          type:
            app.status === "ACCEPTED"
              ? "success"
              : app.status === "REJECTED"
              ? "danger"
              : "info",
          time: new Date(app.createdAt).toLocaleDateString(),
          rawDate: app.createdAt, // Added for accurate sorting
        }));

        const projectNotifications = projectRes.data
          .slice(0, 5) // Getting the 5 most recent projects
          .map((project) => ({
            id: `project-${project.id || project._id}`,
            title: "New Research Project",
            message: `${project.title} has been posted.`,
            type: "new",
            time: new Date(project.createdAt).toLocaleDateString(),
            rawDate: project.createdAt, // Added for accurate sorting
          }));

        data = [...applicationNotifications, ...projectNotifications];
      }

      // PROFESSOR NOTIFICATIONS
      else if (user.role === "PROFESSOR") {
        const myProjects = projectRes.data.filter(
          (project) => project.professorId === userId
        );

        const projectIds = myProjects.map((project) => project.id || project._id);

        data = appRes.data
          .filter((app) => projectIds.includes(app.projectId))
          .map((app) => ({
            id: app.id || app._id,
            title: "New Application Received",
            message: `${app.student?.name} applied for ${app.project?.title}.`,
            type: "info",
            time: new Date(app.createdAt).toLocaleDateString(),
            rawDate: app.createdAt, // Added for accurate sorting
          }));
      }

      // Sort all notifications chronologically (Newest first)
      data.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "success":
        return "border-green-500";
      case "danger":
        return "border-red-500";
      case "info":
        return "border-blue-500";
      case "new":
        return "border-purple-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <>
      {/* Rendered the imported Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">Notifications</h1>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white border-l-4 ${getColor(
                  notification.type
                )} rounded-xl shadow p-5`}
              >
                <h2 className="font-bold text-lg">{notification.title}</h2>
                <p className="text-gray-600 mt-2">{notification.message}</p>
                <p className="text-sm text-gray-400 mt-3">{notification.time}</p>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow p-5 text-gray-500">
              No notifications found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notifications;