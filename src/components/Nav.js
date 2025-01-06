import { connect } from "react-redux";
import { Link } from "react-router";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthenContext";

const Nav = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClickLogout = (event) => {
    const { dispatch } = props;
    dispatch(setAuthedUser("no_authen"));
    auth.logOut();
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/new">New</Link>
        </li>
        <li>
          <b>{auth.user}</b>
        </li>
        <li>
          <button onClick={(e) => handleClickLogout(e)}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(Nav);
