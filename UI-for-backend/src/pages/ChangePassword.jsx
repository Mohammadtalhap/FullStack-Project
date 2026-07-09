import { useState } from "react";
import { useNavigate } from "react-router";
import { changePassword } from "../services/authServices";

function ChangePassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("Please fill in all fields.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setIsLoading(true);

      await changePassword({ currentPassword, newPassword });

      setSuccess("Password changed successfully");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Change Password</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="rounded bg-red-100 p-3 text-sm text-red-600">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded bg-green-100 p-3 text-sm text-green-700">
              {success}
            </p>
          )}
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm font-medium"
            >
              Current Password
            </label>

            <input
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex gap-2">
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
              className="flex-1 text-sm rounded-lg py-2 font-semibold text-white transition bg-sky-600 hover:bg-sky-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
