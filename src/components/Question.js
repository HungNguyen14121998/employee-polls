import { Link } from "react-router-dom";

const Question = (props) => {
  return (
    <div className="question">
      <h3>{props.quetion.author}</h3>
      <p>{new Date(props.quetion.timestamp).toLocaleDateString("en-US")}</p>
      <Link to={`/questions/${props.quetion.id}`}>Show</Link>
    </div>
  );
};

export default Question;
