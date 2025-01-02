import { _getUsers } from "../utils/_DATA";
import { _getQuestions } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";

const AUTHED_ID = "no_authen";

function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}
