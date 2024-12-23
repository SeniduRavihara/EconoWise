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
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { UserDataType } from "@/types";

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
  selectedUser: UserDataType,
  messageContent: string,
  adminUserId: string
) => {
  const userDocRef = collection(db, "users", selectedUser.uid, "messages");
  const payload = {
    senderId: adminUserId,
    receiverId: selectedUser.uid,
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
