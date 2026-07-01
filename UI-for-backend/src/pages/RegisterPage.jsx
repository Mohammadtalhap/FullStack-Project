import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default_profile_pic.png";
import { useAuth } from "../context/AuthContext.jsx";
import { registerUser } from "../services/authServices.js";

function RegisterPage() {
  let navigate = useNavigate();
  const { login } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleRegister = async (e) => {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("profileImage", profileImage);
      console.log("Data: ", data);
      const response = await registerUser(data);
      login(response.user, response.token);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40"></div>

      {/* Registration Form */}
      <div className="fixed inset-0 m-auto Registeration-form h-fit w-[340px] bg-white shadow-2xl py-10 px-6 rounded-2xl z-50">
        <h1 className="text-3xl font-semibold mb-10">Registration Form</h1>
        <form action={handleRegister} className="space-y-4">
          {/* Name Field */}
          <label htmlFor="name" className="">
            Name:
          </label>
          <input
            type="text"
            name="name"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-1"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            required
            onChange={handleChange}
          />
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
          {/* Profile Image */}
          <label htmlFor="image" className="">
            Profile Image:
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-1"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
          {/* Image Preview */}
          <div className="preview-wrapper flex justify-center">
            <div className="h-24 w-24 rounded-full border border-gray-300 overflow-hidden">
              <img
                src={preview ? preview : defaultProfile}
                alt="profile image"
                className="h-full w-full object-cover"
              />
            </div>
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
          {/* Navigation */}
          <div className="mt-5 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/login"
              className="text-sky-600 cursor-pointer hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
