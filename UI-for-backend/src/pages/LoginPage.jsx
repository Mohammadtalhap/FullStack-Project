import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { loginUser } from "../services/authServices.js";

function LoginPage() {
  let navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Change Triggered for: ", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      login(response.user, response.token);
      console.log("Data: ", response);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40"></div>

      {/* Login Form */}

      <div className="fixed inset-0 m-auto login-form h-fit w-[340px] bg-white shadow-2xl py-10 px-6 rounded-2xl z-50">
        <h1 className="text-3xl font-semibold mb-10">Login Form</h1>
        <form action={handleLogin} className="space-y-4">
          {/* Error Message */}
          {error && (
            <p className="bg-red-100 rounded text-red-600 text-sm p-3">
              {error}
            </p>
          )}
          {/* Email Field */}
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-1"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            required
            onChange={handleChange}
          />
          {/* Password Field */}
          <div className="">
            <div className="flex justify-between">
              <label htmlFor="password" className="">
                Password:
              </label>
              {/* Forgot password link */}
              <Link
                to="/forgot-password"
                className="text-sm text-sky-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-1"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              required
              minLength="6"
              onChange={handleChange}
            />
          </div>
          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <Link
              to="/"
              className="flex-1 text-center px-4 py-2 text-sm rounded-lg cursor-pointer transition bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 text-center px-4 py-2 text-sm rounded-lg cursor-pointer transition bg-sky-600 hover:bg-sky-700"
            >
              Submit
            </button>
          </div>

          {/* Naviagation */}
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-sky-600 cursor-pointer hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
