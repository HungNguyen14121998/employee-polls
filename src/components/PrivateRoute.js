import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthenContext";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  return auth.user ? (
    children
  ) : (
    <Navigate to={`/login?redirectTo=${redirectUrl}`} />
  );
};
export default PrivateRoute;
