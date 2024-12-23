import { User } from "firebase/auth";
import React from "react";

export type DataContextType = {
  currentUserData: UserDataType | null;
  setCurrentUserData: React.Dispatch<React.SetStateAction<UserDataType | null>>;
};

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type UserDataType = {
  firstName: string;
  lastName: string;
  nic: string;
  bDate: Date | undefined;
  phone: string;
  address: string;
  uid: string;
  userName: string;
  roles: "ADMIN" | "CLIENT";
  email: string;
};

// export type CurrentUserDataType = {
//   uid: string;
//   userName: string;
//   regNo: string | null;
//   // gender: "male" | "female";
//   roles: "ADMIN" | "CLIENT";
//   registered: boolean;
//   email: string;
//   lastResult: number | null;
// };

export type UserDataInAdminType = {
  uid: string;
  userName: string;
  roles: "ADMIN" | "CLIENT";
  email: string;
};

export type UserInfoType = {
  firstName: string;
  lastName: string;
  nic: string;
  bDate: Date | undefined;
  phone: string;
  address: string;
};

export type ClientTable = {
  name: string;
  email: string;
  uid: string;
};

export type ExamTable = {
  examId: string;
  examName: string;
  examDate: Date;
  examStatus: "pending" | "completed";
  avgResult: number | null;
};

export type ExamDataType = {
  examId: string;
  examName: string;
  examDate: Date;
  examStatus: "pending" | "completed";
  avgResult: number | null;
  examYear: string;
  examResult: number;
  isAbsent: boolean;
  // createdAt: Date;
};

// export type ExamDataType = {
//   examDate: Date;
//   examName: string;
//   examStatus: "pending" | "completed";
//   result: number;
// };
