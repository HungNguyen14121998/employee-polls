import { connect } from "react-redux";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import Question from "./Question";

const Dashboard = (props) => {
  const [newQuestions, setNewQuetions] = useState([]);
  const [doneQuestions, setDoneQuestions] = useState([]);

  useEffect(() => {
    const { questions, authedUser } = props;

    const convertQuestions = Object.values(questions);

    var arrayDoneQuestions = [];
    var arrayNewQuetions = [];
    convertQuestions.forEach((question) => {
      const votesOptionOne = question.optionOne.votes;
      const votesOptionTwo = question.optionTwo.votes;

      console.log(questions);

      const votes = votesOptionOne.concat(votesOptionTwo);

      if (votes.includes(authedUser)) {
        arrayDoneQuestions.push(question);
      } else {
        arrayNewQuetions.push(question);
      }
    });

    setDoneQuestions(arrayDoneQuestions);
    setNewQuetions(arrayNewQuetions);
  }, []);

  return (
    <div className="container">
      <h1 className="center">Home</h1>
      <Nav />
      <h2>New Questions</h2>
      <div className="list-question">
        {newQuestions.map((question) => (
          <Question key={question.id} quetion={question}></Question>
        ))}
      </div>
      <h2>Done Questions</h2>
      <div className="list-question">
        {doneQuestions.map((question) => (
          <Question key={question.id} quetion={question}></Question>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => ({
  questions,
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);
