import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";
import { MessageType } from "@/types";
import { addMessageByClient, sendMessage } from "@/firebase/api";

const ClientMessagingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currentUser?.uid) {
      const collectionRef = collection(
        db,
        "users",
        currentUser.uid,
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
  }, [currentUser]);
  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    await addMessageByClient("admin", newMessage, currentUser.uid);

    setNewMessage("");
  };

  if(!currentUser) return <>Loading...</>;

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
              message.senderId === currentUser.uid ? "text-right" : "text-left"
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
    </div>
  );
};

export default ClientMessagingPage;
