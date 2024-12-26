import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";

const ClientMessagingPage: React.FC = () => {
  const { user } = useAuth(); // Assume the user is logged in
  const [messages, setMessages] = useState<Array<any>>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const chatId = `admin-${user.uid}`;
    const chatRef = collection(db, "chats", chatId, "messages");

    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatId = `admin-${user.uid}`;
    const chatRef = collection(db, "chats", chatId, "messages");

    await addDoc(chatRef, {
      senderId: user.uid,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-blue-600 text-white">
        <h2>Chat with Admin</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.senderId === user.uid ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded ${
                message.senderId === user.uid
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {message.text}
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
    </div>
  );
};

export default ClientMessagingPage;
