import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getAllUsers, sendMessage } from "@/firebase/api";
import { MessageType, UserDataType } from "@/types";
import { useAuth } from "@/hooks/useAuth";

const AdminMessagingPage: React.FC = () => {
  const { currentUser } = useAuth();

  const [users, setUsers] = useState<Array<UserDataType>>([]);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUser?.uid) {
      const collectionRef = collection(
        db,
        "users",
        selectedUser.uid,
        "messages"
      );

      const q = query(collectionRef, orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userMessageArr = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as MessageType),
          uid: doc.id,
        })) as MessageType[];

        setMessages(userMessageArr);
        console.log(userMessageArr);
      });

      return unsubscribe;
    }
  }, [selectedUser]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    if (!currentUser) return;

    console.log("Sending message to", newMessage);

    await sendMessage(selectedUser.uid, newMessage, currentUser.uid);

    setNewMessage("");
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="flex h-[500px]">
      {/* User List */}
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user.uid}
            onClick={() => setSelectedUser(user)}
            className={`p-2 cursor-pointer rounded ${
              selectedUser?.uid === user.uid
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {user.userName || user.email}
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            <div className="p-4 bg-blue-600 text-white">
              <h2>Chat with {selectedUser.userName}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.senderId === currentUser.uid
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block p-2 rounded ${
                      message.senderId === currentUser.uid
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {message.message}
                  </p>
                  <div className="text-xs text-gray-500">
                    {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 flex items-center border-t">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p>Select a user to start a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagingPage;
