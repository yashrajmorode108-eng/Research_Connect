import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
  });

  useEffect(() => {
    fetchProject();
  }, [id]); // Included id in dependency array to prevent stale closures

  const fetchProject = async () => {
    try {
      const res = await axios.get(`https://research-connect-jmno.onrender.com/api/projects/${id}`);
      setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        department: res.data.department || "",
      });
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://research-connect-jmno.onrender.com/api/projects/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Updated Successfully!");
      navigate("/my-projects");
    } catch (error) {
      console.error("Update failed:", error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <>
      {/* Rendered the imported Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">Edit Project</h1>

        {/* Converted wrapper to a formal form element */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="border p-3 rounded-lg w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-lg font-medium"
          >
            Update Project
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProject;