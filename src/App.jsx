import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import he from "he";
import Question from "./Question";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Intro from "./Intro";
// import "./App.css";

export default function App() {
  // Setting three states:
  // to hold the questions and answers
  const [questions, setQuestions] = useState([]);
  // to hold the score when user check the results
  const [count, setCount] = useState(0);
  // to show the score and trigger the conditional rendering
  const [showScore, setShowScore] = useState(false);

  const [checkResults, setCheckResults] = useState(false);
  const [showRemainingQuestions, setShowRemainingQuestions] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newGame, setNewGame] = useState(false);

  const [intro, setIntro] = useState(true);

  // Fetching the questions from the API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        // Setting the questions and answers in the state
        setQuestions(
          data.results.map((question) => ({
            // Unique ID for each question
            key: nanoid(),
            // Content of the question
            question: question.question,
            // Both correct and incorrect questions go in the same array
            allAnswers: mixAnswers([
              he.decode(question.correct_answer),
              ...question.incorrect_answers.map((answer) => he.decode(answer)),
            ]),
            // Correct answer only
            correct_answer: he.decode(question.correct_answer),
            // To check if the user selected the correct answer
            isCorrect: null,
            // To check which answer has been selected (could be used for styling)
            selectedAnswer: null,
          }))
        );
        // Reset the score and hide the score (not clear if needed)
        setCheckResults(false);
        setCount(0);
        setShowScore(false);
      });
  }, []);

  const { width, height } = useWindowSize();

  // Function to mix the correct and incorrect answers, used in the useEffect
  function mixAnswers(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.key}
        labelId={nanoid()}
        questions={questions}
        questionKey={question.key}
        question={he.decode(question.question)}
        allAnswers={question.allAnswers}
        correctAnswer={question.correct_answer}
        isCorrect={question.isCorrect}
        setQuestions={setQuestions}
        setCount={setCount}
        selectedAnswer={question.selectedAnswer}
        checkResults={checkResults}
      />
    );
  });

  // Filtering the questions to check if all of them have been answered
  const answeredQuestions = questions.filter(
    (question) => question.isCorrect === true || question.isCorrect === false
  );

  // Starting new game
  function startNewGame() {
    setCheckResults(false);
    setCount(0);
    setShowScore(false);
    setShowRemainingQuestions(false);
    setShowConfetti(false);
    setQuestions([]);
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          data.results.map((question) => ({
            key: nanoid(),
            question: question.question,
            allAnswers: mixAnswers([
              he.decode(question.correct_answer),
              ...question.incorrect_answers.map((answer) => he.decode(answer)),
            ]),
            correct_answer: he.decode(question.correct_answer),
            isCorrect: null,
            selectedAnswer: null,
          }))
        );
      });
  }

  return (
    <div className="App">
      {intro ? (
        <Intro setIntro={setIntro} />
      ) : (
        <>
          <div className="quizz-container">{questionElements}</div>
          <div className="score-container">
            {showScore ? <h3>You scored {count}/5 correct answers</h3> : ""}
            {showRemainingQuestions ? (
              <h3 className="remaining-questions">
                Please answer all questions
              </h3>
            ) : (
              ""
            )}
            <button
              className="check-answers"
              onClick={() => {
                if (answeredQuestions.length === 5) {
                  setCheckResults(true);
                  setShowScore(true);
                  setShowRemainingQuestions(false);
                  if (count === 5) {
                    setShowConfetti(true);
                  }
                  setNewGame(true); // Set newGame to true after checking answers
                } else {
                  setShowRemainingQuestions(true);
                }
              }}
            >
              {newGame ? "Start a new game" : "Check answers"}
            </button>
            {showConfetti && <Confetti />}
          </div>
        </>
      )}
    </div>
  );
}
