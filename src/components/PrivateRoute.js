import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const authedUser = useSelector((state) => state.authedUser);

  return authedUser != null && authedUser !== "no_authen" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
