import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FeaturedProfessors() {
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
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          Featured Professors
        </h2>

        <p className="text-gray-500 mt-3">
          Connect with leading researchers
        </p>
      </div>

      {professors.length === 0 ? (
        <div className="text-center text-gray-500">
          No professors found.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {professors.map((professor) => (
            <div
              key={professor.id}
              className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-lg transition"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  professor.name
                )}&background=2563eb&color=fff`}
                alt={professor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <h3 className="font-bold text-xl">
                {professor.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {professor.department || "Department"}
              </p>

              <p className="text-gray-600 mt-4 line-clamp-3">
                {professor.bio || "No bio available."}
              </p>

              <Link
                to={`/professor/${professor.id}`}
                className="inline-block mt-5 text-blue-600 font-semibold hover:underline"
              >
                View Profile →
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProfessors;