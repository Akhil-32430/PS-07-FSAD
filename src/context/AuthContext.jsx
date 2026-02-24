import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const ROLE_PASSWORDS = {
  admin: "Admin@2026",
  citizen: "Citizen@2026",
  observer: "Observer@2026",
  analyst: "Analyst@2026",
};

const STORAGE_KEY = "election-monitor-auth";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { isAuthenticated: false, role: "" };
    } catch {
      return { isAuthenticated: false, role: "" };
    }
  });

  const login = (role, password) => {
    const expectedPassword = ROLE_PASSWORDS[role];

    if (!expectedPassword || expectedPassword !== password) {
      return { success: false, message: "Invalid role or password." };
    }

    const nextSession = { isAuthenticated: true, role };
    setSession(nextSession);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));

    return { success: true };
  };

  const logout = () => {
    const nextSession = { isAuthenticated: false, role: "" };
    setSession(nextSession);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      session,
      login,
      logout,
      rolePasswords: ROLE_PASSWORDS,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
