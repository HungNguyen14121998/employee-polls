import React, { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import New from "./New";
import QuestionDetail from "./QuestionDetail";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <div>
      <h1>Employee Polls</h1>
      {props.loading === true ? null : props.logged === true ? (
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/questions/:question_id" element={<QuestionDetail />} />
          <Route path="/leaderboard" exact element={<Leaderboard />} />
          <Route path="/new" exact element={<New />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  logged: authedUser !== "no_authen",
});

export default connect(mapStateToProps)(App);
