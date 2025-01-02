import {
  CREATE_QUESTION_USER,
  RECEIVE_USERS,
  SAVE_QUESTION_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case CREATE_QUESTION_USER:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: [
            ...state[action.question.author].questions,
            action.question.id,
          ],
        },
      };
    case SAVE_QUESTION_USER:
      const { authedUser, answer } = action.answerInfo;

      return {
        ...state,
        [action.answerInfo.authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [action.answerInfo.questionId]: answer,
          },
        },
      };
    default:
      return state;
  }
}
