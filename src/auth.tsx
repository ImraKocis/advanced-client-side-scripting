import * as React from "react";
import { LoginData } from "@/lib/types/auth/login.ts";
import { UserData } from "@/lib/types/auth/jwt.ts";
import { API_AUTH_BASE_URL } from "@/lib/constants/api.ts";
import { LoginResponse } from "@/lib/types/api/auth/login-response.ts";
import { AuthContext } from "@/hooks/useAuth.ts";

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  user: UserData | null;
}

const key = "auth.user";

function getStoredUser() {
  const storage = localStorage.getItem(key);
  if (!storage) return null;
  return JSON.parse(storage);
}

function setStoredUser(payload: UserData | null) {
  if (payload) {
    localStorage.setItem(key, JSON.stringify(payload));
  } else {
    localStorage.removeItem(key);
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserData | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (data: LoginData): Promise<boolean> => {
    const response = await fetch(`${API_AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) return false;

    const result: LoginResponse = await response.json();

    setStoredUser(result);
    setUser(result);
    return true;
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
