/* import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [role, setRole] =
    useState("STUDENT");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://research-connect-jmno.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(
        "Registration Successful!"
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="STUDENT">
            Student
          </option>

          <option value="PROFESSOR">
            Professor
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;*/
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, FlaskConical, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  
  // UI State
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("student"); // 'student' or 'professor'
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "", // Only used for professor
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleRegister = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    await axios.post(
      "https://research-connect-jmno.onrender.com/api/auth/register",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role.toUpperCase(),
        ...(role === "professor" && {
          designation: formData.designation,
        }),
      }
    );

    toast.success("Registration Successful!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Registration Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-12">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">
            R
          </div>
          <span className="font-bold text-lg tracking-tight">ResearchConnect</span>
        </div>
        
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-600">
            <Moon size={20} />
          </button>
          <button 
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto mt-12 px-4">
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-12">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 1 ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
            1
          </div>
          <div className="w-16 h-[2px] bg-gray-200 mx-2">
            <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 2 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${step === 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400'}`}>
            2
          </div>
        </div>

        {/* STEP 1: Role Selection */}
        {step === 1 && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Join ResearchConnect</h1>
            <p className="text-gray-500 mb-10">Choose your role to get started</p>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
              {/* Student Card */}
              <div 
                onClick={() => setRole("student")}
                className={`p-6 bg-white rounded-xl border-2 cursor-pointer transition-all ${
                  role === "student" ? "border-blue-600 ring-4 ring-blue-50" : "border-gray-100 hover:border-gray-300 shadow-sm"
                }`}
              >
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 text-gray-600">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Student</h3>
                <p className="text-sm text-gray-500 mb-4 h-10">
                  Browse research projects and apply to work with professors
                </p>
                <ul className="text-xs text-gray-500 space-y-2">
                  <li className="flex items-center before:content-['•'] before:mr-2 before:text-gray-300">Apply to research projects</li>
                  <li className="flex items-center before:content-['•'] before:mr-2 before:text-gray-300">Build your academic portfolio</li>
                  <li className="flex items-center before:content-['•'] before:mr-2 before:text-gray-300">Connect with faculty</li>
                </ul>
              </div>

              {/* Professor Card */}
              <div 
                onClick={() => setRole("professor")}
                className={`p-6 bg-white rounded-xl border-2 cursor-pointer transition-all ${
                  role === "professor" ? "border-blue-600 ring-4 ring-blue-50" : "border-gray-100 hover:border-gray-300 shadow-sm"
                }`}
              >
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 text-gray-600">
                  <FlaskConical size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Professor</h3>
                <p className="text-sm text-gray-500 mb-4 h-10">
                  Post research opportunities and find talented students
                </p>
                <ul className="text-xs text-gray-500 space-y-2">
                  <li className="flex items-center before:content-['•'] before:mr-2 before:text-gray-300">Create and manage projects</li>
                  <li className="flex items-center before:content-['•'] before:mr-2 before:text-gray-300">Review student applications</li>
                  <li className="flex items-center before:content-['•'] before:mr-2 before:text-gray-300">Build your research team</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full max-w-2xl flex items-center justify-center py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors mb-6"
            >
              Continue as {role === "student" ? "Student" : "Professor"}
              <ChevronRight size={18} className="ml-2" />
            </button>

            <p className="text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Log In</Link>
            </p>
          </div>
        )}

        {/* STEP 2: Registration Form */}
        {step === 2 && (
          <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-500">
            <button 
              onClick={() => setStep(1)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back
            </button>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">
              Create your {role === "student" ? "Student" : "Professor"} Account
            </h2>
            <p className="text-sm text-gray-500 mb-8">Fill in your details to get started</p>

            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={role === "student" ? "John Doe" : "Dr. Jane Smith"}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {role === "student" ? "University Email" : "Institutional Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@university.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Designation (Professor Only) */}
              {role === "professor" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    required
                    placeholder="e.g. Associate Professor"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors mt-2"
              >
                Create Account
              </button>

            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Log In</Link>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Register;