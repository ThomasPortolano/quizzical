export default function Question(props) {
  function addCorrectAnswer() {
    props.setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="quizz-container">
      <h2 className="questions">{props.question}</h2>

      <div
        className="answers-container"
        // Mapping through the items and displaying them
      >
        {props.allAnswers.map((answer, index) => {
          const id = `${props.labelId}-${index}`;
          return (
            <div
              key={index}
              // when user selects an answer it adds a className "each-answer selected"
              className={`each-answer ${
                props.checkResults
                  ? props.selectedAnswer === answer
                    ? "picked"
                    : answer === props.correctAnswer
                    ? "correct"
                    : ""
                  : props.selectedAnswer === answer
                  ? "selected"
                  : ""
              }`}
            >
              <input
                className="radio"
                type="radio"
                name={props.question}
                id={id}
                value={answer}
                checked={props.selectedAnswer === answer}
                onClick={() => {
                  if (answer === props.correctAnswer) {
                    console.log(`${answer} correct`);
                    console.log(props.checkResults);
                    addCorrectAnswer();
                    props.setQuestions((prevState) =>
                      prevState.map((question) =>
                        question.key === props.questionKey
                          ? {
                              ...question,
                              isCorrect: true,
                              selectedAnswer: answer,
                            }
                          : question
                      )
                    );
                  } else if (answer !== props.correctAnswer) {
                    props.setQuestions((prevState) =>
                      prevState.map((question) =>
                        question.key === props.questionKey
                          ? {
                              ...question,
                              isCorrect: false,
                              selectedAnswer: answer,
                            }
                          : question
                      )
                    );
                  }
                  console.log(props.questions);
                }}
              />
              <label htmlFor={id} className="test">
                {answer}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
