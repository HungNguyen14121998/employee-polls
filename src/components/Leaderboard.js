import { connect } from "react-redux";
import Nav from "./Nav";

const Leaderboard = (props) => {
  return (
    <div className="container">
      <h1 className="center">Leaderboard</h1>
      <Nav />
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={window.location.origin + `/${user.id}.png`}
                  width={50}
                  height={50}
                  alt="avatar"
                />
              </td>
              <td>{user.name}</td>
              <td>{Object.values(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  ),
});

export default connect(mapStateToProps)(Leaderboard);
