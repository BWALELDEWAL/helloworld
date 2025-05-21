// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // This runs once when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try to get current user (if logged in via cookie)
        const res = await axios.get("http://localhost:5000/api/v1/users/profile", {
          withCredentials: true, 
        });
        setUser(res.data.user); 
      } catch (err) {
        setUser(null); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUser(); 
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        { email, password },
        { withCredentials: true } // Store cookie
      );
      setUser(res.data.user); // Save user info after login
      return { success: true };
    } catch (error) {
      setUser(null); // Clear user if login fails
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout function
  const logout = async () => {
    await axios.post("http://localhost:5000/api/v1/logout", {
      withCredentials: true, // Send cookie to clear it
    });
    setUser(null); // Remove user from context
  };

  // Provide the context to children components
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext easily
export const useAuth = () => useContext(AuthContext);
