import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import DepartmentGrid from "../components/DepartmentGrid";
import FeaturedProjects from "../components/FeaturedProjects";
import FeaturedProfessors from "../components/FeaturedProfessors";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  // Added a safety check just in case "user" doesn't exist in localStorage yet
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <>
      {/* 1. Rendered the imported Navbar */}
      <Navbar />

      {/* 2. Page Content Wrapper */}
      <div className="min-h-screen flex flex-col">
        <Hero />


        {/* Professor Dashboard Actions */}
       
        {/* General Page Components */}
        <DepartmentGrid />
        <FeaturedProjects />
        <FeaturedProfessors />
        
        {/* Pushes footer to the bottom if content is short */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;