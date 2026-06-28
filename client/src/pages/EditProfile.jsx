import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function EditProfile() {

  const [resume, setResume] = useState(null);

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      department: "",
      year: "",
      cgpa: "",
      skills: "",
      researchInterests: "",
      linkedin: "",
      github: "",
      portfolio: "",
      bio: "",
      resumeUrl: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "https://research-connect-jmno.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        department:
          res.data.department || "",
        year: res.data.year || "",
        cgpa: res.data.cgpa || "",
        skills:
          res.data.skills || "",
        researchInterests:
          res.data.researchInterests || "",
        linkedin:
          res.data.linkedin || "",
        github:
          res.data.github || "",
        portfolio:
          res.data.portfolio || "",
        bio: res.data.bio || "",
        resumeUrl: res.data.resumeUrl || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    // Save profile details
    const profileRes = await axios.put(
      "https://research-connect-jmno.onrender.com/api/users/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Upload resume if selected
    if (resume) {
      const data = new FormData();
      data.append("resume", resume);

      const uploadRes = await axios.post(
        "https://research-connect-jmno.onrender.com/api/users/upload-resume",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        resumeUrl: uploadRes.data.resumeUrl,
      }));
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        name: profileRes.data.name,
        email: profileRes.data.email,
      })
    );

    alert("Profile Updated Successfully");

  } catch (error) {
    console.log(error);
    alert("Failed to update profile");
  }
};

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="border rounded-lg p-3 bg-gray-100"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={
                formData.department
              }
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="cgpa"
              placeholder="CGPA"
              value={formData.cgpa}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            rows="3"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full mt-6"
          />

          <textarea
            rows="3"
            name="researchInterests"
            placeholder="Research Interests"
            value={
              formData.researchInterests
            }
            onChange={handleChange}
            className="border rounded-lg p-3 w-full mt-6"
          />

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.linkedin}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="github"
              placeholder="GitHub"
              value={formData.github}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
           <div className="mt-6">
  <label className="block mb-2 font-medium">
    Resume (PDF)
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) =>
      setResume(e.target.files[0])
    }
    className="w-full border rounded-lg p-3"
  />

  {formData.resumeUrl && (
    <a
      href={`https://research-connect-jmno.onrender.com/uploads/${formData.resumeUrl}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 underline mt-3 inline-block"
    >
      📄 View Current Resume
    </a>
  )}
</div>
          </div>

          <textarea
            rows="5"
            name="bio"
            placeholder="About Me"
            value={formData.bio}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full mt-6"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl mt-8"
          >
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditProfile;