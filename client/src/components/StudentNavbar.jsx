import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function StudentNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 px-12 py-4 flex items-center justify-between font-sans relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white font-extrabold text-lg w-8 h-8 flex items-center justify-center rounded-md">
          R
        </div>
        <span className="font-bold text-gray-900 text-lg tracking-tight">
          ResearchConnect
        </span>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
        <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">
          Home
        </Link>
        <Link to="/projects" className="hover:text-gray-900 transition-colors">
          Projects
        </Link>
        <Link to="/professors" className="hover:text-gray-900 transition-colors">
          Professors
        </Link>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-5 relative" ref={dropdownRef}>
        {/* Student Role Badge */}
        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          Student
        </div>

        {/* Dark Mode Toggle */}
        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        {/* Notifications Icon with Dot */}
        <Link to="/notifications" className="relative text-gray-600 hover:text-gray-900 p-1 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full border border-white"></span>
        </Link>

        {/* User Profile Avatar Trigger */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="block focus:outline-none rounded-full transition-transform active:scale-95"
        >
          <img
            className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="User profile"
          />
        </button>

        {/* Profile Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-1 duration-150">
            {/* User Meta Section */}
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-base">John Doe</h2>
              <p className="text-sm text-gray-500 truncate">john.doe@university.edu</p>
              
              {/* Internal Role Indicator */}
              <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold mt-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Student
              </div>
            </div>

            {/* Main Navigation Links */}
            <div className="py-1.5">
              <Link 
                to="/profile" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                My Profile
              </Link>
              <Link 
                to="/applied-projects" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Applied Projects
              </Link>
              <Link 
                to="/saved-projects" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Saved Projects
              </Link>
              <Link 
                to="/notifications" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Notifications
              </Link>
              <Link 
                to="/settings" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Settings
              </Link>
            </div>

            {/* Action Section */}
            <div className="border-t border-gray-100 bg-gray-50/50">
              <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }}
  className="text-red-500"
>
  Log Out
</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default StudentNavbar;