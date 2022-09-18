import React from "react";
import { useState, useEffect } from "react";
import StartPage from "./components/StartPage.js";
import Question from "./components/Question";

function App() {
	const [questionsData, setQuestionsData] = useState([]);
	const [startState, setStartState] = useState(true);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		fetch("https://the-trivia-api.com/api/questions?limit=5&region=LT")
			.then((resp) => resp.json())
			.then((data) => {
				setQuestionsData(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const questionElements = questionsData.map((obj) => (
		<Question
			key={obj.id}
			id={obj.id}
			category={obj.category}
			difficulty={obj.difficulty}
			question={obj.question}
			correctAnswer={obj.correctAnswer}
			incorrectAnswers={obj.incorrectAnswers}
			setAnswers={setAnswers}
		/>
	));

	function handleStartClick() {
		setStartState(!startState);
	}

	function checkAnswers() {
		console.log("getting this: " + answers.length);
	}

	return (
		<div className="container">
			{startState && <StartPage handleClick={handleStartClick} />}
			{!startState && (
				<div className="container--question--elements">{questionElements}</div>
			)}
			{!startState && (
				<button className="check--answers" onClick={checkAnswers}>
					Check Answers
				</button>
			)}
		</div>
	);
}

export default App;
