import React from "react";
import { useState, useEffect } from "react";
import StartPage from "./components/StartPage.js";
import Question from "./components/Question";

function App() {
	const [questionsData, setQuestionsData] = useState([]);
	const [startState, setStartState] = useState(true);

	useEffect(() => {
		fetch("https://the-trivia-api.com/api/questions?limit=5&region=LT")
			.then((response) => response.json())
			.then((data) => {
				setQuestionsData(data);
				console.log(data);
			})
			.catch((error) => console.log(error));
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
		/>
	));

	function handleStartClick() {
		setStartState(!startState);
	}

	return (
		<div className="container">
			{startState && <StartPage handleClick={handleStartClick} />}
			{!startState && (
				<div className="container--question--elements">{questionElements}</div>
			)}
			{!startState && <button className="check--answers">Check Answers</button>}
		</div>
	);
}

export default App;
