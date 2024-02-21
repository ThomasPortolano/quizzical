### Quizzical (alpha) is a WIP quizz game built with React

It is based on the Open Trivia DB (https://opentdb.com/) that provided the API to support the game. Designs have been provided by Scrimba (https://scrimba.com/). This is the last solo project of the React basics courses.

The goal of the game is to score the highest number of point in a trivia game.
Each quizz comes with 5 questions. The goal is to score 5/5. There's over 4000 questions available in the database.

Main features still to be developed:

~~- Start a new game (once the quizz is finished. Currently user can only refresh the browser)~~

- Link the intro page with the quizz page (probably using state for conditional rendering)
- Fix various bugs (score can sometime can above 5, ~~confetti are not taking the full viewport~~, import flex boxes used as answers)
- Once user have clicked on check results and if user has completed 5 questions, then answers cannot be changed anymore
- Some code refactor are needed (removing bloated code in Question.JSX and the CSS, add function components to make it more readible and possible add PropTypes so that ESLint stops displaying so many errors :/ I am getting allergic to red!)
