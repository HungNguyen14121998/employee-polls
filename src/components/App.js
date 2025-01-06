import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router";
import Leaderboard from "./Leaderboard";
import New from "./New";
import QuestionDetail from "./QuestionDetail";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

function App(props) {
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);
  return (
    <div>
      <h1>Employee Polls</h1>
      {authedUser === null ? null : (
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:question_id"
            element={
              <PrivateRoute>
                <QuestionDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/new"
            element={
              <PrivateRoute>
                <New />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
