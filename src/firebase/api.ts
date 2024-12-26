import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, db, provider } from "./config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { MessageType, UserDataType } from "@/types";

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(userCredential);
    const user = userCredential.user;

    const payload = {
      uid: "",
      userName: "",
      email: "",
      roles: "CLIENT",
    };

    await setDoc(doc(db, "users", user.uid), {
      ...payload,
      uid: user.uid,
      userName: name,
      email,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const googleSignIn = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    // console.log(userCredential);

    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const payload = {
        uid: user.uid,
        userName: user.displayName || "",
        email: user.email || "",
        roles: "CLIENT",
      };

      await setDoc(userDocRef, payload);
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --------------------------------------------------

export const featchCurrentUserData = async (currentUser: User) => {
  try {
    const documentRef = doc(db, "users", currentUser.uid);
    const userDataDoc = await getDoc(documentRef);

    if (userDataDoc.exists()) {
      const userData = userDataDoc.data() as UserDataType;
      console.log("Current user data fetched successfully", userData);
      return userData;
    } else {
      console.log("Document does not exist.");
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --------------------------------------------------

export const sendMessage = async (
  receiverId: string,
  messageContent: string,
  senderId: string
) => {
  const userDocRef = collection(db, "users", receiverId, "messages");
  const payload = {
    senderId: senderId,
    receiverId: receiverId,
    message: messageContent,
    timestamp: serverTimestamp(),
  };

  try {
    await addDoc(userDocRef, payload);

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// --------------------------------------------------------

export const addMessageByClient = async (
  receiverId: string,
  messageContent: string,
  senderId: string
) => {
  const userDocRef = collection(db, "users", senderId, "messages");
  const payload = {
    senderId: senderId,
    receiverId: receiverId,
    message: messageContent,
    timestamp: serverTimestamp(),
  };

  try {
    await addDoc(userDocRef, payload);

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// --------------------------------------------------------

export const getAllUsers = async () => {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const usersData = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as UserDataType),
  })) as UserDataType[];

  // console.log("All users fetched successfully", usersData);
  return usersData;
};

// --------------------------------------------------------

export const fetchAllMessages = async (selectedUser: UserDataType) => {
  const userDocRef = collection(db, "users", selectedUser.uid, "messages");
  const messagesSnapshot = await getDocs(userDocRef);
  const messagesData = messagesSnapshot.docs.map((doc) =>
    doc.data()
  ) as MessageType[];

  console.log("All messages fetched successfully", messagesData);
  return messagesData;
};
