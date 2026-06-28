import PublicNavbar from "./PublicNavbar";
import StudentNavbar from "./StudentNavbar";
import ProfessorNavbar from "./ProfessorNavbar";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <PublicNavbar />;
  }

  if (user.role === "STUDENT") {
    return <StudentNavbar />;
  }

  if (user.role === "PROFESSOR") {
    return <ProfessorNavbar />;
  }

  return <PublicNavbar />;
}

export default Navbar;