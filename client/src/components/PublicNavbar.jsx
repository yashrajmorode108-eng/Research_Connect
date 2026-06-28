import { Link } from "react-router-dom";
import { Bell, Moon, Sun } from "lucide-react";
import { useState } from "react";

function PublicNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>

          <span className="font-bold text-xl">
            ResearchConnect
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/projects"
            className="hover:text-blue-600"
          >
            Projects
          </Link>

          <Link
            to="/professors"
            className="hover:text-blue-600"
          >
            Professors
          </Link>

          <Link
            to="/about"
            className="hover:text-blue-600"
          >
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <Link
            to="/login"
            className="border px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;