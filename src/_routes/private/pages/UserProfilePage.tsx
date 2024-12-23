import React, { useState, useEffect } from "react";

// User profile data interface
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dob: string; // Date of Birth
}

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch user profile data (simulated here with dummy data)
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Replace with actual API call to fetch user profile
      const response = await fetch("/api/user-profile");
      const data = await response.json();
      setUserProfile(data);
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (
      !userProfile.name ||
      !userProfile.email ||
      !userProfile.phone ||
      !userProfile.dob
    ) {
      setError("All fields are required.");
      return;
    }

    // Simulate an API call to update the user profile
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      // If update is successful, switch back to view mode
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        User Profile
      </h2>

      <div className="mb-6">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">
          Personal Information
        </h3>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userProfile.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userProfile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={userProfile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={userProfile.dob}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Edit / Save Button */}
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md"
            >
              Edit
            </button>
          )}
          {!isEditing && (
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
