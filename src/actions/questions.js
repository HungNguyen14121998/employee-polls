import { _saveQuestionAnswer } from "../utils/_DATA";
import { _saveQuestion } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUETIONS";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

// handler
export function saveQuestionAnswerData({ authedUser, qid, answer }) {
  return (dispatch) => {
    // Thường thì call API chỗ này
    return _saveQuestionAnswer({ authedUser, qid, answer }).then((result) => {
      if (result) {
        saveQuestionAnswer({ authedUser, questionId: qid, answer });
      }
    });
  };
}

// actions
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question,
  };
}

export function saveQuestionAnswer({ authedUser, questionId, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    answerInfo: { authedUser, questionId, answer },
  };
}
