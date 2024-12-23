import React, { useState } from "react";

const SystemSettingsPage = () => {
  const [formData, setFormData] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    notifications: true,
    theme: "light",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Settings:", formData);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-6"
      >
        {/* User Information */}
        <div>
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
            <label className="ml-2 text-sm text-gray-700">
              Enable email notifications
            </label>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Appearance</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={formData.theme === "light"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring focus:ring-blue-200"
              />
              <label className="ml-2 text-sm text-gray-700">Light Mode</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={formData.theme === "dark"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring focus:ring-blue-200"
              />
              <label className="ml-2 text-sm text-gray-700">Dark Mode</label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettingsPage;
