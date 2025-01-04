import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {
  const navigate = useNavigate();

  const handleClickLogout = (event) => {
    const { dispatch } = props;

    dispatch(setAuthedUser("no_authen"));

    navigate("/login");
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
          <b>{props.authedUser}</b>
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
