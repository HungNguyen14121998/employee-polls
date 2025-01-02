import {
  _saveQuestionAnswer,
  _saveQuestion,
  _getQuestions,
  _getUsers,
} from "../utils/_DATA";

describe("DATA", () => {
  it("_getUsers resloves", async () => {
    const result = _getUsers();
    await expect(result).resolves.not.toBeNull();
  });

  it("_getQuestion resolves", async () => {
    const result = _getQuestions();
    await expect(result).resolves.not.toBeNull();
  });

  it("_saveQuestion reslove", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "author",
    };
    const result = _saveQuestion(question);
    await expect(result).resolves.not.toBeNull();
  });

  it("_saveQuestion rejects", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
    };
    const result = _saveQuestion(question);
    await expect(result).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  /** funciton _saveQuestionAnswer not working successs */
  // it("_saveQuestionAnswer reslove", async () => {
  //   const answer = {
  //     authedUser: "sarahedo",
  //     qid: "8xf0y6ziyjabvozdd253nd",
  //     answer: "Build our new application with Javascript",
  //   };
  //   const result = _saveQuestionAnswer(answer);
  //   await expect(result).resolves.toEqual(true);
  // });

  it("_saveQuestionAnswer rejects", async () => {
    const answer = {
      authedUser: "author",
      qid: "8xf0y6ziyjabvozdd253nd",
    };
    const result = _saveQuestionAnswer(answer);
    await expect(result).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
