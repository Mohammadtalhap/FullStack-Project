import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authServices.js";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;
  console.log("Email Value: ", email);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword({
        email: email.trim(),
        verificationCode: verificationCode.trim(),
        newPassword: newPassword.trim(),
      });

      navigate("/login");
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
          <h1 className="text-2xl font-semibold">Reset your Password</h1>
          <h4 className="text-sm px-4">
            We've sent a 6-digit verification code to {email}.
          </h4>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Verification code field */}
          <label htmlFor="verificationCode" className="">
            Verification Code:
          </label>
          <input
            type="text"
            name="verificationCode"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-1 mt-1"
            id="verificationCode"
            placeholder="Enter verification code"
            autoFocus
            required
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />

          {/* New password Field */}
          <label htmlFor="newPassword" className="">
            New Password:
          </label>
          <input
            type="password"
            name="newPassword"
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-1 mt-1"
            id="newPassword"
            placeholder="Enter new password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {error && (
            <p className="rounded bg-red-100 p-3 text-sm text-red-600">
              {error}
            </p>
          )}
          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-center px-4 py-2 text-sm rounded-lg cursor-pointer text-white transition bg-sky-600 hover:bg-sky-700"
            >
              {isLoading ? "Reseting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
