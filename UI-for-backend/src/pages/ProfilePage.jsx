import { Link } from "react-router-dom";
import TopTitleBar from "../components/TopTitleBar";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../services/authServices";

function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  const imageUrl = `http://localhost:5000/uploads/${user.profileImage}`;

  return (
    <div className="w-full flex flex-col">
      {/* Profile Content */}
      <div className="p-8">
        <div className="max-w-2xl">
          <TopTitleBar title="My Profile" />

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-300">
                <img
                  src={imageUrl}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="border-b pb-3">
                <label className="text-sm font-semibold text-gray-600">
                  Username
                </label>
                <p className="text-lg">{user.name}</p>
              </div>
              <div className="border-b pb-3">
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                <p className="text-lg">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <Link
                to="/change-password"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Change Password
              </Link>
              <button
                onClick={logout}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
