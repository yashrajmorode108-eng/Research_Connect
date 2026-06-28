import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/applications"
      );

      const myApplications = res.data.filter(
        (app) => app.studentId === user.id
      );

      setApplications(myApplications);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Applications</h1>

      <h3>Welcome, {user?.name}</h3>

      <hr />

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>{app.project.title}</h2>

            <p>
              {app.project.description}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {app.project.department}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {app.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;