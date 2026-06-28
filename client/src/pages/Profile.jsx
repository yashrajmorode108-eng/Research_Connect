import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40"></div>

          {/* Profile Section */}
          <div className="px-10 pb-10">

            <div className="-mt-16 flex flex-col md:flex-row md:items-end gap-6">

              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}&size=200&background=2563eb&color=fff`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />

              <div className="flex-1">
                <h1 className="text-4xl font-bold">
                  {user?.name}
                </h1>

                <p className="text-gray-500 mt-1">
                  {user?.email}
                </p>

                <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
                  {user?.role}
                </span>
              </div>

              <Link
  to="/edit-profile"
  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
>
  Edit Profile
</Link>

            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="bg-slate-100 rounded-2xl p-6">
                <h2 className="text-3xl font-bold">
                  {user?.role === "STUDENT"
                    ? "Student"
                    : "Professor"}
                </h2>

                <p className="text-gray-500 mt-2">
                  Account Type
                </p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-6">
                <h2 className="text-3xl font-bold">
                  Active
                </h2>

                <p className="text-gray-500 mt-2">
                  Account Status
                </p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-6">
                <h2 className="text-3xl font-bold">
                  ResearchConnect
                </h2>

                <p className="text-gray-500 mt-2">
                  Platform
                </p>
              </div>

            </div>

            {/* Account Information */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5">
                Account Information
              </h2>

              <div className="bg-slate-50 rounded-2xl p-6 space-y-4">

                <div>
                  <p className="text-gray-500">
                    Full Name
                  </p>

                  <p className="font-semibold">
                    {user?.name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Email Address
                  </p>

                  <p className="font-semibold">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Role
                  </p>

                  <p className="font-semibold">
                    {user?.role}
                  </p>
                </div>

              </div>
            </div>

            {/* Role Specific Section */}
            {user?.role === "STUDENT" ? (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-5">
                  Student Dashboard
                </h2>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <p className="text-gray-600">
                    Track your applications,
                    saved projects and research
                    opportunities from here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-5">
                  Professor Dashboard
                </h2>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <p className="text-gray-600">
                    Manage your projects,
                    applicants and research
                    opportunities from here.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;