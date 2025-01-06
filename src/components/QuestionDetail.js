import { useParams } from "react-router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import { saveQuestionAnswer } from "../actions/questions";
import { saveQuestionUser } from "../actions/users";
// import { saveQuestionAnswerData } from "../actions/questions";
import { useNavigate, Navigate } from "react-router";
import { useAuth } from "./AuthenContext";

const QuestionDetail = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();

  let params = useParams();
  const questionId = params.question_id;

  const [question, setQuestion] = useState({});
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [answeredOne, setAnsweredOne] = useState(false);
  const [answeredTwo, setAnsweredTwo] = useState(false);
  const [percentOptionOne, setPercentOptionOne] = useState(0);
  const [percentOptionTwo, setPercentOptionTwo] = useState(0);

  const numberUsers = props.users.length;
  const numberUsersAnswered = props.users.filter((user) => {
    return Object.keys(user.answers).includes(`${questionId}`);
  }).length;
  const percentAnswered = (numberUsersAnswered / numberUsers) * 100;

  const handleClickOptionOne = (e) => {
    const { dispatch } = props;
    const authedUser = auth.user ?? "";

    const answer = optionOne;
    dispatch(saveQuestionAnswer({ authedUser, questionId, answer }));
    dispatch(saveQuestionUser({ authedUser, questionId, answer: "optionOne" }));

    // not working
    // dispatch(saveQuestionAnswerData({ authedUser, qid: questionId, answer }));
  };

  const handleClickOptionTwo = (e) => {
    const { dispatch } = props;
    const authedUser = auth.user ?? "";

    const answer = optionTwo;
    dispatch(saveQuestionAnswer({ authedUser, questionId, answer }));
    dispatch(saveQuestionUser({ authedUser, questionId, answer: "optionTwo" }));

    // not working
    // dispatch(saveQuestionAnswerData({ authedUser, qid: questionId, answer }));
  };

  useEffect(() => {
    const convertQuestions = Object.values(props.questions);

    convertQuestions.forEach((question) => {
      if (question.id === questionId) {
        setQuestion(question);
        setAnsweredOne(question.optionOne.votes.includes(auth.user ?? ""));
        setAnsweredTwo(question.optionTwo.votes.includes(auth.user ?? ""));

        const totalVotes =
          question.optionOne.votes.length + question.optionTwo.votes.length;
        const percentVoteOne =
          (question.optionOne.votes.length / totalVotes) * 100;
        const percentVoteTwo =
          (question.optionTwo.votes.length / totalVotes) * 100;
        setPercentOptionOne(Math.floor(percentVoteOne));
        setPercentOptionTwo(Math.floor(percentVoteTwo));
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

  return !Object.keys(props.questions).includes(questionId) && auth.user ? (
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
            <b>With {percentOptionOne}% users voted option one</b>
          </li>
          <li>
            <label>1. {optionOne} </label>
            <button onClick={(e) => handleClickOptionOne(e)}>Click</button>
          </li>
          <li>
            <b>With {percentOptionTwo}% users voted option two</b>
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
