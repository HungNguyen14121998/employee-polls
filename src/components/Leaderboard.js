import { connect } from "react-redux";
import Nav from "./Nav";
import { useEffect } from "react";

const Leaderboard = (props) => {
  useEffect(() => {
    console.log(props.users);
  }, []);

  return (
    <div className="container">
      <h1 className="center">Leaderboard</h1>
      <Nav />
      <table>
        <tr>
          <th>User</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
        {Object.values(props.users).map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{Object.values(user.answers).length}</td>
            <td>{user.questions.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Leaderboard);
