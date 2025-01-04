import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import { saveQuestionAnswer } from "../actions/questions";
import { saveQuestionUser } from "../actions/users";
// import { saveQuestionAnswerData } from "../actions/questions";
import { useNavigate, Navigate } from "react-router-dom";

const QuestionDetail = (props) => {
  const navigate = useNavigate();

  let params = useParams();
  const questionId = params.question_id;

  const [question, setQuestion] = useState({});
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [answeredOne, setAnsweredOne] = useState(false);
  const [answeredTwo, setAnsweredTwo] = useState(false);

  const numberUsers = props.users.length;
  const numberUsersAnswered = props.users.filter((user) => {
    return Object.keys(user.answers).includes(`${questionId}`);
  }).length;
  const percentAnswered = (numberUsersAnswered / numberUsers) * 100;

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

    convertQuestions.forEach((question) => {
      if (question.id === questionId) {
        setQuestion(question);
        setAnsweredOne(question.optionOne.votes.includes(props.authedUser));
        setAnsweredTwo(question.optionTwo.votes.includes(props.authedUser));
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

  return !Object.keys(props.questions).includes(questionId) ||
    props.authedUser == null ||
    props.authedUser === "no_authen" ? (
    <Navigate to="/404" />
  ) : (
    <div className="container">
      <h1 className="center">Detail Poll</h1>
      <Nav />
      <div>
        <div className="avatar">
          <img
            src={window.location.origin + `/${question.author}.png`}
            width={50}
            height={50}
            alt="avatar"
          />
        </div>
        <h3 className="center">Poll by {question.author} </h3>
        <h3 className="center">
          Users answered {`${numberUsersAnswered}/${numberUsers}`} -{" "}
          {`${percentAnswered}%`}
        </h3>
        <h3 className="center">Would You Rather</h3>
        <ul>
          <li>
            {answeredOne && <b>Your last answer is option one</b>}
            {answeredTwo && <b>Your last answer is option two</b>}
          </li>
          <li>
            <label>1. {optionOne}</label>
            <button onClick={(e) => handleClickOptionOne(e)}>Click</button>
          </li>
          <li>
            <label>2. {optionTwo}</label>
            <button onClick={(e) => handleClickOptionTwo(e)}>Click</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => ({
  questions,
  authedUser,
  users: Object.values(users),
});

export default connect(mapStateToProps)(QuestionDetail);
