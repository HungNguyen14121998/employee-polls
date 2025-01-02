export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_QUESTION_USER = "SAVE_QUESTION_USER";
export const CREATE_QUESTION_USER = "CREATE_QUESTION_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveQuestionUser({ authedUser, questionId, answer }) {
  return {
    type: SAVE_QUESTION_USER,
    answerInfo: { authedUser, questionId, answer },
  };
}

export function createQuestionUser(question) {
  return {
    type: CREATE_QUESTION_USER,
    question,
  };
}
