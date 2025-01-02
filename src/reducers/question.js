import {
  RECEIVE_QUESTIONS,
  CREATE_QUESTION,
  SAVE_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case CREATE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case SAVE_QUESTION_ANSWER:
      const { authedUser, questionId, answer } = action.answerInfo;

      const question = state[questionId];
      if (question.optionOne.text === answer) {
        const newVotes = state[questionId].optionOne.votes.concat(authedUser);
        return {
          ...state,
          [action.answerInfo.questionId]: {
            ...state[questionId],
            optionOne: {
              votes: newVotes,
              text: answer,
            },
          },
        };
      } else {
        const newVotes = state[questionId].optionTwo.votes.concat(authedUser);
        return {
          ...state,
          [action.answerInfo.questionId]: {
            ...state[questionId],
            optionTwo: {
              votes: newVotes,
              text: answer,
            },
          },
        };
      }
    default:
      return state;
  }
}
