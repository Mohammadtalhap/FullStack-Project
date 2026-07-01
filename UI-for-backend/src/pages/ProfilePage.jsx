import TopTitleBar from "../components/TopTitleBar";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  const imageUrl = `http://localhost:5000/uploads/${user.profileImage}`;

  return (
    <div className="w-full flex flex-col">
      {/* Top Title Bar */}
      {/* <div className="h-[80px] w-full flex justify-between items-center px-8 bg-amber-200">
        <div className="">
          <div className="logo-wrapper h-16 w-16 rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="title text-2xl font-semibold">Profile</div>
        <div className="flex items-center">
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div> */}
      <TopTitleBar imageUrl={imageUrl} title="Profile" logout={logout} />

      {/* Profile Content */}
      <div className="p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-300">
                <img
                  src={imageUrl}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="border-b pb-3">
                <label className="text-sm font-semibold text-gray-600">
                  Username
                </label>
                <p className="text-lg">{user.username}</p>
              </div>
              <div className="border-b pb-3">
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                <p className="text-lg">{user.email}</p>
              </div>
              <div className="border-b pb-3">
                <label className="text-sm font-semibold text-gray-600">
                  User ID
                </label>
                <p className="text-lg text-gray-500">{user._id}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
