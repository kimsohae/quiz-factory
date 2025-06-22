"use client";
import { User } from "@/types/quiz";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
};

const UserContext = createContext<UserContextType | null>(null);
export const initialUser: User = {
  progress: 0,
  score: 0,
  // selectedAnswers: [],
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserInfo] = useState(initialUser);

  const setUser = (param) => {
    setUserInfo((prev) => ({ ...prev, ...param }));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
  // const
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser는 UserProvider와 함께 사용해 주세요");
  }
  return context;
}
