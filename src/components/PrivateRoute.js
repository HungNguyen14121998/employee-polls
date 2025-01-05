import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthenContext";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.user ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
