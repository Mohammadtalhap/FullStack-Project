import { useState } from "react";
import { loginUser } from "../services/authServices.js";
import { useAuth } from "../context/AuthContext.jsx";

function UserLoginModal() {
  const { user, login } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoginOpen(false);
      navigate('/');
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      {/* Main Login Button */}
      <button
        className="px-3 py-1 bg-sky-600 text-sm text-white rounded-lg cursor-pointer"
        onClick={() => setIsLoginOpen(true)}
      >
        Login
      </button>

      {/* Overlay */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsLoginOpen(false)}
        ></div>
      )}

      {/* Login Form */}
      {isLoginOpen && (
        <div className="fixed inset-0 m-auto login-form h-fit w-[340px] bg-white shadow-2xl p-4 z-50">
          <h1 className="text-xl font-semibold mb-5">Login Form</h1>
          <form action={handleLogin} className="space-y-4">
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
            <label htmlFor="password" className="">
              Password:
            </label>
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
            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                className="flex-1 px-4 py-2 text-sm rounded-lg cursor-pointer transition bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsLoginOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm rounded-lg cursor-pointer transition bg-sky-600 hover:bg-sky-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserLoginModal;
