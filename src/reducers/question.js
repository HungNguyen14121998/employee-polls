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
        const newVotesOptionOne =
          state[questionId].optionOne.votes.concat(authedUser);
        const newVotesOptionTwo = state[questionId].optionTwo.votes.filter(
          (user) => user !== authedUser
        );
        const optionTwoText = state[questionId].optionTwo.text;
        return {
          ...state,
          [action.answerInfo.questionId]: {
            ...state[questionId],
            optionOne: {
              votes: newVotesOptionOne,
              text: answer,
            },
            optionTwo: {
              votes: newVotesOptionTwo,
              text: optionTwoText,
            },
          },
        };
      } else {
        const newVotesOptionTwo =
          state[questionId].optionTwo.votes.concat(authedUser);
        const newVotesOptionOne = state[questionId].optionOne.votes.filter(
          (user) => user !== authedUser
        );
        const optionOneText = state[questionId].optionOne.text;
        return {
          ...state,
          [action.answerInfo.questionId]: {
            ...state[questionId],
            optionOne: {
              votes: newVotesOptionOne,
              text: optionOneText,
            },
            optionTwo: {
              votes: newVotesOptionTwo,
              text: answer,
            },
          },
        };
      }
    default:
      return state;
  }
}
