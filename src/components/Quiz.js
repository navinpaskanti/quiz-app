import React, { useState } from "react";
import questions from "../questions";
import "./Quiz.css";

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => setCurrent((prev) => prev + 1);
  const handlePrev = () => setCurrent((prev) => prev - 1);

  const handleSubmit = () => setSubmitted(true);
  const handleRestart = () => {
    setCurrent(0);
    setAnswers([]);
    setSubmitted(false);
  };

  if (submitted) {
    const score = answers.reduce(
      (acc, answer, i) => (answer === questions[i].answer ? acc + 1 : acc),
      0
    );
    return (
      <div className="quiz-container bg-white p-4">
        <h2 className="text-center">Quiz Completed!</h2>
        <p className="text-center">
          Your final score is: {score} / {questions.length}
        </p>
        <button
          className="btn btn-primary d-block mx-auto"
          onClick={handleRestart}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const selected = answers[current];

  return (
    <div className="quiz-container bg-white p-4">
      <h2 className="text-center">Quiz App</h2>
      <p className="mt-3">{currentQuestion.question}</p>
      <div className="mb-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            className={`btn d-block w-100 mt-2 btn-outline-primary ${
              selected === option ? "active" : ""
            }`}
            style={
              selected === option
                ? { backgroundColor: "green", color: "white" }
                : {}
            }
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="btn btn-secondary"
        onClick={handlePrev}
        disabled={current === 0}
      >
        Previous
      </button>
      {current < questions.length - 1 ? (
        <button
          className="btn btn-primary ms-2"
          onClick={handleNext}
          disabled={!selected}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-success ms-2"
          onClick={handleSubmit}
          disabled={!selected}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Quiz;
