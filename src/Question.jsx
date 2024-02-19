export default function Question(props) {
  return (
    <div className="quizz-container">
      <h2 className="questions">{props.question}</h2>
      {props.allAnswers.map((answer, index) => {
        return (
          <div key={index} className="qcm-container">
            <input type="radio" name="answer" value={answer} />
            <label>{answer}</label>
          </div>
        );
      })}
    </div>
  );
}
