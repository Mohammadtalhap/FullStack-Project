import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authServices.js";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await forgotPassword(email.trim());

      navigate("/reset-password", { state: { email } });
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

      {/* Forgot Password Form */}
      <div className="fixed inset-0 m-auto h-fit w-[340px] space-y-8 bg-white shadow-2xl py-10 px-6 rounded-2xl z-50">
        <div className="flex flex-col text-center justify-center items-center space-y-3">
          <h1 className="text-2xl font-semibold">Forgot Password ?</h1>
          <h4 className="text-sm px-4">
            Enter your registered email address. We'll send a 6-digit
            verification code.
          </h4>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-1 mt-1"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <p className="rounded bg-red-100 p-3 text-sm text-red-600">
              {error}
            </p>
          )}
          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 text-sm rounded-lg py-2 transition bg-gray-300 hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-center px-4 py-2 text-sm rounded-lg cursor-pointer text-white transition bg-sky-600 hover:bg-sky-700"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
