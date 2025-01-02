import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import { saveQuestionAnswer } from "../actions/questions";
import { saveQuestionUser } from "../actions/users";
// import { saveQuestionAnswerData } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const QuestionDetail = (props) => {
  const navigate = useNavigate();

  let params = useParams();
  const questionId = params.question_id;

  const [question, setQuestion] = useState({});
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleClickOptionOne = (e) => {
    const { dispatch, authedUser } = props;

    const answer = optionOne;
    dispatch(saveQuestionAnswer({ authedUser, questionId, answer }));
    dispatch(saveQuestionUser({ authedUser, questionId, answer: "optionOne" }));

    navigate("/");
    // not working
    // dispatch(saveQuestionAnswerData({ authedUser, qid: questionId, answer }));
  };

  const handleClickOptionTwo = (e) => {
    const { dispatch, authedUser } = props;

    const answer = optionTwo;
    dispatch(saveQuestionAnswer({ authedUser, questionId, answer }));
    dispatch(saveQuestionUser({ authedUser, questionId, answer: "optionTwo" }));

    navigate("/");
    // not working
    // dispatch(saveQuestionAnswerData({ authedUser, qid: questionId, answer }));
  };

  useEffect(() => {
    const convertQuestions = Object.values(props.questions);

    console.log(optionOne);
    console.log(optionTwo);

    convertQuestions.forEach((question) => {
      if (question.id === questionId) {
        setQuestion(question);
        return;
      }
    });

    const answerOne = question.optionOne;
    const answerTwo = question.optionTwo;

    if (answerOne || answerTwo) {
      setOptionOne(answerOne.text);
      setOptionTwo(answerTwo.text);
    }
  });

  return (
    <div className="container">
      <h1 className="center">Detail Poll</h1>
      <Nav />
      <h3 className="center">Poll by {question.author}</h3>
      <h3 className="center">Would You Rather</h3>
      <ul>
        <li>
          <label>{optionOne}</label>
          <button onClick={(e) => handleClickOptionOne(e)}>Click</button>
        </li>
        <li>
          <label>{optionTwo}</label>
          <button onClick={(e) => handleClickOptionTwo(e)}>Click</button>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questions,
  authedUser,
});

export default connect(mapStateToProps)(QuestionDetail);
