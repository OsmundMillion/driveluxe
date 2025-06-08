import { createContext, useContext } from "react";

export type AuthUser = {
  id: number;
  username: string;
  role: "admin" | "customer";
};

export const AuthContext = createContext<{ user: AuthUser | null }>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
