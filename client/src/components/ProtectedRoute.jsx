import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole,
}) {
  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (
    allowedRole &&
    user?.role !== allowedRole
  ) {
    if (user?.role === "PROFESSOR") {
      return (
        <Navigate to="/professor" />
      );
    }

    return (
      <Navigate to="/student" />
    );
  }

  return children;
}

export default ProtectedRoute;