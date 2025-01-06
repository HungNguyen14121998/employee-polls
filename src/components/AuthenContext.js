import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginAction = (username) => {
    setUser(username);
    // localStorage.setItem("username", username);
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");

    navigate(redirectUrl ? redirectUrl : "/");
  };

  const logOut = () => {
    setUser(null);
    // localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
