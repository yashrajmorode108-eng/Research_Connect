import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Professors() {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/users/professors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfessors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Professors
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {professors.map((professor) => (
            <div
              key={professor.id}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  professor.name
                )}&background=2563eb&color=fff`}
                alt={professor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <h2 className="text-xl font-bold">
                {professor.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {professor.department}
              </p>

              <Link
                to={`/professor/${professor.id}`}
                className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                View Profile
              </Link>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Professors;