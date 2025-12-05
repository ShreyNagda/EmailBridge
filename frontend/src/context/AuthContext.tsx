import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/axios";

interface User {
  _id: string;
  email: string;
  clientId: string;
  targetEmails: string[];
  allowedOrigins: string[];
  isVerified: boolean;
  isAcceptingEmails: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await api.get("/auth/me");
      if (data.success) {
        setUser({
          _id: data._id,
          email: data.email,
          clientId: data.clientId,
          targetEmails: data.targetEmails,
          allowedOrigins: data.allowedOrigins || [],
          isVerified: data.isVerified,
          isAcceptingEmails: data.isAcceptingEmails,
        });
      }
    } catch (error) {
      // Not authenticated, just ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, refreshUser: checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
