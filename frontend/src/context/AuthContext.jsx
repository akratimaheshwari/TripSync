import { createContext, useContext, useState, useEffect } from 'react';
import api from "../services/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LOGIN
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  // REGISTER (REAL BACKEND)
  const register = async (name, email, password) => {
    await api.post("/auth/register", {
      name,
      email,
      password,
    });
    await login(email, password);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token"); //  important
    setUser(null);
  };

  // AUTO LOGIN (REAL USER FETCH)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};