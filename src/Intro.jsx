export default function Intro(props) {
  return (
    <div className="intro-container">
      <h1 className="app-title">Quizzical</h1>
      <p className="intro">
        Play with your friends the most awesome quizz games in the universe.
        Thank you to the Open Trivia DB for providing the questions.
      </p>
      <button onClick={() => props.setIntro(false)} className="start">
        Start quiz
      </button>
    </div>
  );
}
