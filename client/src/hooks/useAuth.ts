import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  role: string;
  canPublish: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("dms_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("dms_user", JSON.stringify(userData));
    localStorage.setItem("dms_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("dms_user");
    localStorage.removeItem("dms_token");
    setUser(null);
  };

  return { user, loading, login, logout };
}
