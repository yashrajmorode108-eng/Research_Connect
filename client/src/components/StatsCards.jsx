import { useEffect, useState } from "react";
import axios from "axios";

function StatsCards() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    savedProjects: 0,
    appliedProjects: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/users/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Available Projects",
      value: stats.totalProjects,
    },
    {
      title: "Saved Projects",
      value: stats.savedProjects,
    },
    {
      title: "Applied Projects",
      value: stats.appliedProjects,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 py-8">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-3xl font-bold">
            {item.value}
          </h2>

          <p className="text-gray-500">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;