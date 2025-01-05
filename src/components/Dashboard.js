import { connect } from "react-redux";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import Question from "./Question";
import { useAuth } from "./AuthenContext";

const Dashboard = (props) => {
  const auth = useAuth();
  const [newQuestions, setNewQuetions] = useState([]);
  const [doneQuestions, setDoneQuestions] = useState([]);

  const [isOnUnanswered, setIsOnUnanswered] = useState(true);
  const [isOnAnswered, setIsOnAnswered] = useState(false);

  const handleCleckUnanswered = () => {
    setIsOnUnanswered(!isOnUnanswered);
  };

  const handleCleckAanswered = () => {
    setIsOnAnswered(!isOnAnswered);
  };

  useEffect(() => {
    const { questions, authedUser } = props;

    const convertQuestions = Object.values(questions).sort(
      (a, b) => b.timestamp - a.timestamp
    );

    var arrayDoneQuestions = [];
    var arrayNewQuetions = [];
    convertQuestions.forEach((question) => {
      const votesOptionOne = question.optionOne.votes;
      const votesOptionTwo = question.optionTwo.votes;

      const votes = votesOptionOne.concat(votesOptionTwo);

      if (auth.user) {
        if (votes.includes(auth.user)) {
          arrayDoneQuestions.push(question);
        } else {
          arrayNewQuetions.push(question);
        }
      }
    });

    setDoneQuestions(arrayDoneQuestions);
    setNewQuetions(arrayNewQuetions);
  }, []);

  return (
    <div className="container">
      <h1 className="center">Home</h1>
      <Nav />
      <div className="unanswered-view" onClick={() => handleCleckUnanswered()}>
        <h2>
          Unanswered {isOnUnanswered == false && `(${newQuestions.length})`}
        </h2>
        <div className="list-question">
          {isOnUnanswered &&
            newQuestions.map((question) => (
              <Question key={question.id} quetion={question}></Question>
            ))}
        </div>
      </div>
      <div className="answered-view" onClick={() => handleCleckAanswered()}>
        <h2>Answered {isOnAnswered == false && `(${doneQuestions.length})`}</h2>
        <div className="list-question">
          {isOnAnswered &&
            doneQuestions.map((question) => (
              <Question key={question.id} quetion={question}></Question>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => ({
  questions,
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);
