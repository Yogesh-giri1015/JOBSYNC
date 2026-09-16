/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import * as authService from "../services/authService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(credentials) {
    const data = await authService.login(credentials);

    localStorage.setItem("authToken", data.token);

    localStorage.setItem(
      "authUser",
      JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      }),
    );

    setUser(data);
  }

  async function register(userData) {
    const data = await authService.register(userData);

    localStorage.setItem("authToken", data.token);

    localStorage.setItem(
      "authUser",
      JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      }),
    );

    setUser(data);
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
