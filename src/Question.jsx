export default function Question(props) {
  return (
    <div className="quizz-container">
      <h2 className="questions">{props.question}</h2>
      <div className="answers-container">
        {props.allAnswers.map((answer, index) => {
          return (
            <div key={index} className="each-answer">
              <input
                className="radio"
                type="radio"
                name={props.question}
                id={answer}
                value={answer}
                onClick={() => {
                  if (answer === props.correctAnswer) {
                    console.log("correct");
                  }
                }}
              />
              <label htmlFor={answer}>{answer}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
