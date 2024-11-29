import * as React from "react";
import { LoginData } from "@/lib/types/auth/login.ts";
import { UserData } from "@/lib/types/auth/jwt.ts";
import { API_AUTH_BASE_URL, API_BASE_URL } from "@/lib/constants/api.ts";
import { LoginResponse } from "@/lib/types/api/auth/login-response.ts";
import { AuthContext } from "@/hooks/useAuth.ts";
import { RegisterData, UpdateData } from "@/lib/types/auth/register.ts";

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  update: (data: { userName: string; userId: string }) => Promise<boolean>;
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

  const register = React.useCallback(
    async (data: RegisterData): Promise<boolean> => {
      const response = await fetch(`${API_AUTH_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: data.userName,
          email: data.email,
          password: data.password,
        }),
      });

      return response.ok;
    },
    [],
  );

  const update = React.useCallback(
    async (data: { userName: string; userId: string }): Promise<boolean> => {
      const response = await fetch(`${API_BASE_URL}/User/${data.userId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: data.userName,
        }),
      });
      if (!response.ok) return false;
      const result: UpdateData = await response.json();
      return await login({ ...result });
    },
    [login],
  );

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, update }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
