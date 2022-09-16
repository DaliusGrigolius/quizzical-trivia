import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Question(props) {
	const [answers, setAnswers] = useState([]);
	const [chosen, setChosen] = useState("");

	useEffect(() => {
		setAnswers(shuffleArray([props.correct_answer, ...props.incorrect_answers]));
	}, []);

	function shuffleArray(array) {
		let currentId = array.length;
		while (0 !== currentId) {
			let randomId = Math.floor(Math.random() * currentId);
			currentId -= 1;
			let temp = array[currentId];
			array[currentId] = array[randomId];
			array[randomId] = temp;
		}
		return array;
	}

	const handleChoose = (e) => {
		e.preventDefault();
		setChosen(e.target.value);
		console.log(chosen);
	};

	const buttonElements = answers.map((btn) => {
		return (
			<input
				type="button"
				className="answer--button"
				key={nanoid()}
				value={btn}
				onClick={handleChoose}
			/>
		);
	});

	return (
		<div className="question--container">
			<h6 className="question--category">Category: "{props.category}"</h6>
			<h6 className="question--difficulty"> Difficulty: "{props.difficulty}"</h6>
			<p className="question--question">{props.question}</p>
			<div className="question---answers">{buttonElements}</div>
			<div className="hr"></div>
		</div>
	);
}

export default Question;
