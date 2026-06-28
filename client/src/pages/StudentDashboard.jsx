import Navbar from "../components/Navbar";
import StudentHero from "../components/StudentHero";
import StatsCards from "../components/StatsCards";
import DepartmentGrid from "../components/DepartmentGrid";
import FeaturedProjects from "../components/FeaturedProjects";
import FeaturedProfessors from "../components/FeaturedProfessors";

function StudentDashboard() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

     <StudentHero />

      <StatsCards />

      <DepartmentGrid />

      <FeaturedProjects />

      <FeaturedProfessors />
    </div>
  );
}

export default StudentDashboard;