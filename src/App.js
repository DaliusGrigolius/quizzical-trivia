import React from "react";
import { useState, useEffect } from "react";
import StartPage from "./components/StartPage.js";
import Question from "./components/Question";

function App() {
	const [startState, setStartState] = useState(true);
	const [questionsData, setQuestionsData] = useState([]);

	useEffect(() => {
		fetch("https://the-trivia-api.com/api/questions?limit=5&region=LT")
			.then((response) => response.json())
			.then((data) => {
				setQuestionsData(data);
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	//-----------------

	//-------------------
	const questionElements = questionsData.map((obj) => {
		return (
			<Question
				id={obj.id}
				key={obj.id}
				category={obj.category}
				question={obj.question}
				difficulty={obj.difficulty}
				correct_answer={obj.correctAnswer}
				incorrect_answers={obj.incorrectAnswers}
			/>
		);
	});

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
