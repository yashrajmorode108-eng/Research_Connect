/*import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://research-connect-jmno.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful!");

      // Send everyone to Home
      navigate("/");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;*/
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Moon } from "lucide-react";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://research-connect-jmno.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-12 flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">
            R
          </div>

          <span className="font-bold text-lg tracking-tight">
            ResearchConnect
          </span>
        </div>

        <nav className="hidden md:flex space-x-8 text-sm text-gray-500">
          <Link
            to="/"
            className="hover:text-gray-900 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-gray-900 transition-colors"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">

          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Moon size={20} />
          </button>

          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>

        </div>

      </header>

      {/* Main Content */}

      <main className="flex-1 flex flex-col items-center mt-20 px-4">

        <div className="w-full max-w-[440px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

          <div className="text-center mb-8">

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>

            <p className="text-sm text-gray-500">
              Enter your credentials to access your account
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email
              </label>

              <input
                type="email"
                required
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full px-4 py-2.5 bg-transparent border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />

            </div>

            <div>

              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>

              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full px-4 py-2.5 bg-transparent border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />

            </div>

            <div className="flex items-center justify-between pt-1">

              <label className="flex items-center">

                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />

                <span className="ml-2 text-sm text-gray-600">
                  Remember me
                </span>

              </label>

              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>

            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors mt-2"
            >
              Log In
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-sm text-gray-500">
              New to ResearchConnect?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;