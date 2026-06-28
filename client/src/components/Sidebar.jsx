import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        ResearchConnect
      </h1>

      <p className="mb-6 font-semibold">
        {user?.name}
      </p>

      {user?.role === "STUDENT" ? (
        <div className="flex flex-col gap-4">
          <Link to="/student">
            Dashboard
          </Link>

          <Link to="/my-applications">
            My Applications
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Link to="/professor">
            Dashboard
          </Link>

          <Link to="/create-project">
            Create Project
          </Link>

          <Link to="/my-projects">
            My Projects
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;