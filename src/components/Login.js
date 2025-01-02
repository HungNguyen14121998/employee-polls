import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useState("");

  useEffect(() => {
    const convertUsers = Object.values(props.users);
    setUsers(convertUsers);
    setUserLogin(convertUsers[0].id);
  }, []);

  const handleSelectUser = (e) => {
    const user = e.target.value;
    setUserLogin(user);
  };

  const handleClickLogin = (event) => {
    const { dispatch } = props;
    dispatch(setAuthedUser(userLogin));

    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="center">Login Page</h1>
      <select onChange={handleSelectUser}>
        Choose your users
        {users.map((user) => (
          <option key={user.id}>{user.id}</option>
        ))}
      </select>
      <button onClick={(e) => handleClickLogin(e)}>Login</button>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
