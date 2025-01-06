import { Link } from "react-router-dom";

const Question = (props) => {
  const { id, author, timestamp } = props.quetion;

  return (
    <div className="question">
      <h3>{author}</h3>
      <p>{new Date(timestamp).toLocaleDateString("en-US")}</p>
      <Link to={`/questions/${id}`}>Show</Link>
    </div>
  );
};

export default Question;
