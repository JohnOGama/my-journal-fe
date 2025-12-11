"use client";

import { User } from "@/types/session";
import { createContext, useContext, useState } from "react";

type UserOmitted = Omit<User, "createdAt" | "updatedAt" | "emailVerified">;

type UserContextType = {
  user: UserOmitted | null;
  setUser: (u: UserOmitted) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserOmitted | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside <UserProvider>");
  }

  return context;
};
