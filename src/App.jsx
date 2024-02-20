import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import he from "he";
import Question from "./Question";
import "./App.css";

export default function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(
          data.results.map((question) => ({
            key: nanoid(),
            question: question.question,
            allAnswers: [
              question.correct_answer,
              ...question.incorrect_answers,
            ],
            correct_answer: question.correct_answer,
          }))
        );
        // console.log(data);
      });
  }, []);

  function mixAnswers(answers) {
    return answers.sort(() => Math.random() - 0.5);
  }

  function decodeAnswers(answers) {
    return answers.map((answer) => he.decode(answer));
  }

  function mixDecodeAnswers(answers) {
    return mixAnswers(decodeAnswers(answers));
  }

  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.key}
        question={he.decode(question.question)}
        allAnswers={mixDecodeAnswers(question.allAnswers)}
        correctAnswer={he.decode(question.correct_answer)}
      />
    );
  });

  // console.log(questions);

  return (
    <>
      <div className="quizz-container">{questionElements}</div>
      <button>Check Answers</button>
    </>
  );
}
