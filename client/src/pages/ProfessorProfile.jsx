import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ProfessorProfile() {
  const { id } = useParams();

const [professor, setProfessor] = useState(null);
  useEffect(() => {
    fetchProfessor();
  }, []);

  const fetchProfessor = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://research-connect-jmno.onrender.com/api/users/professor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     setProfessor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!professor) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">

        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex items-center gap-8">

            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                professor.name
              )}&background=2563eb&color=fff&size=180`}
              alt={professor.name}
              className="w-40 h-40 rounded-full"
            />

            <div>

              <h1 className="text-4xl font-bold">
                {professor.name}
              </h1>

              <p className="text-gray-500 mt-2">
                {professor.department}
              </p>

              <p className="mt-6">
                {professor.bio || "No bio added."}
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-slate-100 rounded-xl p-5">
              <h3 className="font-bold">
                Email
              </h3>

              <p className="mt-2 break-all">
                {professor.email}
              </p>
            </div>

            <div className="bg-slate-100 rounded-xl p-5">
              <h3 className="font-bold">
                Research Interests
              </h3>

              <p className="mt-2">
                {professor.researchInterests ||
                  "Not Added"}
              </p>
            </div>

            <div className="bg-slate-100 rounded-xl p-5">
              <h3 className="font-bold">
                Portfolio
              </h3>

              {professor.portfolio ? (
                <a
                  href={professor.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Visit
                </a>
              ) : (
                <p>Not Added</p>
              )}
            </div>

          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">
            Projects Posted
          </h2>

          <div className="space-y-5">
{professor.projects.length === 0 ? (
              <p>No Projects Posted</p>
            ) : (
            professor.projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {project.department}
                  </p>

                  <p className="mt-3">
                    {project.description}
                  </p>

                  <Link
                    to={`/project/${project.id}`}
                    className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    View Project
                  </Link>

                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfessorProfile;