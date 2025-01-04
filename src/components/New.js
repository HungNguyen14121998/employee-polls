import { connect, useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { useState } from "react";
import { createQuestion } from "../actions/questions";
import { createQuestionUser } from "../actions/users";
import { useNavigate } from "react-router-dom";

const New = (props) => {
  const navigate = useNavigate();

  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();

  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangeTextOptionOne = (e) => {
    const text = e.target.value;
    setOptionOneText(text);
  };

  const handleChangeTextOptionTwo = (e) => {
    const text = e.target.value;
    setOptionTwoText(text);
  };

  const handleSubmitButton = (e) => {
    const id = generateUID();

    const quetion = {
      id,
      author: authedUser,
      timestamp: Date.now(),
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      },
    };

    dispatch(createQuestion(quetion));
    dispatch(createQuestionUser(quetion));

    setIsSuccess(true);

    setOptionOneText("");
    setOptionTwoText("");

    setTimeout(() => navigate("/"), 1000);
  };

  function generateUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  return (
    <div className="container">
      <h1 className="center">New</h1>
      <Nav />
      <h3 className="center">Would Your Rather</h3>
      <p className="center">Create Your Own Poll</p>
      {isSuccess && (
        <h4 data-testid="label-success">Create Quetions Success</h4>
      )}
      <b>First Option</b>
      <br></br>
      <input
        type="text"
        value={optionOneText}
        onChange={(e) => handleChangeTextOptionOne(e)}
        data-testid="option-one-input"
      />
      <br></br>
      <b>Second Option</b>
      <br></br>
      <input
        type="text"
        value={optionTwoText}
        onChange={(e) => handleChangeTextOptionTwo(e)}
        data-testid="option-two-input"
      />
      <br></br>
      <button
        onClick={(e) => handleSubmitButton(e)}
        data-testid="submit-button"
      >
        Submit
      </button>
    </div>
  );
};

export default New;
