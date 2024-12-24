import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";

const ManageNotificationsPage = () => {
  interface Notification {
    id: string;
    title: string;
    message: string;
    createdAt: Date;
  }
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
  });

  // Fetch notifications from Firestore
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const notificationsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            message: data.message,
            createdAt: data.createdAt.toDate(),
          };
        });
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Handle input changes for new notification
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to create a new notification
  const handleFormSubmit = async (e:any) => {
    e.preventDefault();

    if (!newNotification.title.trim() || !newNotification.message.trim()) {
      alert("Title and message are required.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "notifications"), {
        ...newNotification,
        createdAt: serverTimestamp(),
      });
      console.log("Notification added with ID:", docRef.id);

      // Add the new notification to the list
      setNotifications((prev) => [
        ...prev,
        { id: docRef.id, ...newNotification, createdAt: new Date() },
      ]);

      // Reset the form
      setNewNotification({ title: "", message: "" });
      alert("Notification created successfully!");
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {/* Notification Form */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4 mb-8"
      >
        <h2 className="text-lg font-semibold mb-2">Create Notification</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={newNotification.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter notification title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            value={newNotification.message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter notification message"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send Notification
        </button>
      </form>

      {/* Notifications List */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Notification History</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="border-b pb-4 mb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="text-md font-bold text-gray-700">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(
                    notification.createdAt || Date.now()
                  ).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageNotificationsPage;
