import { createContext, useContext, useState, useEffect } from "react";

export interface AuthUser {
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: "customer" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => ({ success: false, message: "No provider" }),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// ── Stored user shape (includes password, kept separate from AuthUser) ──
interface StoredUser extends AuthUser {
  password: string;
}

const USERS_KEY = "driveluxe_users";
const SESSION_KEY = "driveluxe_session";

// Seed one admin account so admin routes can be tested
const seedAdminIfNeeded = () => {
  const existing: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const hasAdmin = existing.some((u) => u.role === "admin");
  if (!hasAdmin) {
    existing.push({
      username: "admin",
      password: "admin123",
      fullName: "DriveLuxe Admin",
      email: "admin@driveluxe.com",
      phoneNumber: "",
      address: "",
      role: "admin",
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(existing));
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // On mount: seed admin + restore session
  useEffect(() => {
    seedAdminIfNeeded();
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const login = (username: string, password: string): { success: boolean; message: string } => {
    const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const match = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!match) {
      return { success: false, message: "Invalid username or password." };
    }

    // Strip password before storing in session / state
    const { password: _pw, ...safeUser } = match;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { success: true, message: "Welcome back!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}