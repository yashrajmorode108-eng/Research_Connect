import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    description: "",
    skills: "",
    eligibility: "",
    duration: "",
    positions: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async () => {
  try {
    const token =
      localStorage.getItem("token");

    await axios.post(
      "https://research-connect-jmno.onrender.com/api/projects/create",
      {
        title: formData.title,
        description: formData.description,
        department: formData.domain,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Project Published!");

    setFormData({
      title: "",
      domain: "",
      description: "",
      skills: "",
      eligibility: "",
      duration: "",
      positions: "",
      deadline: "",
    });
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to create project"
    );
  }
};

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Create Research Project
        </h1>

        <div className="bg-white rounded-2xl shadow p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="domain"
              placeholder="Research Domain"
              value={formData.domain}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              name="positions"
              placeholder="Open Positions"
              value={formData.positions}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="border rounded-lg p-3 w-full mt-6"
          />

          <textarea
            name="skills"
            placeholder="Required Skills"
            value={formData.skills}
            onChange={handleChange}
            rows="3"
            className="border rounded-lg p-3 w-full mt-6"
          />

          <textarea
            name="eligibility"
            placeholder="Eligibility Criteria"
            value={formData.eligibility}
            onChange={handleChange}
            rows="3"
            className="border rounded-lg p-3 w-full mt-6"
          />

          <div className="mt-6">
            <label className="block mb-2">
              Application Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2">
              Project Banner Image
            </label>

            <input
              type="file"
              className="border rounded-lg p-3 w-full"
            />
          </div>

          <div className="flex gap-4 mt-8">

            <button className="border px-6 py-3 rounded-xl">
              Save Draft
            </button>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Publish Project
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CreateProject;