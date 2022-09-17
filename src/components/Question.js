import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Question(props) {
	const [buttons, setButtons] = useState(allNewButtons());

	function allNewButtons() {
		const newButtons = [];
		const incorrectBtns = [...props.incorrectAnswers];
		for (let i = 0; i < incorrectBtns.length; i++) {
			newButtons.push(generateNewButton(incorrectBtns[i], false));
		}
		newButtons.push(generateNewButton(props.correctAnswer, true));
		return shuffleArray(newButtons);
	}

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

	function generateNewButton(value, bool) {
		return {
			id: nanoid(),
			value: value,
			isHeld: false,
			isChosen: false,
			isCorrect: bool,
		};
	}

	function handleClick(id) {
		setButtons((oldButton) =>
			oldButton.map((btn) => {
				return btn.id === id
					? { ...btn, isHeld: true, isChosen: true }
					: { ...btn, isHeld: false, isChosen: false };
			})
		);
	}

	const buttonElements = buttons.map((btn) => (
		<button
			className="answer--button"
			key={btn.id}
			style={{
				backgroundColor: btn.isHeld ? "#59E391" : "#293264",
				color: btn.isHeld ? "#293264" : "white",
			}}
			onClick={() => handleClick(btn.id)}
		>
			{btn.value}
		</button>
	));

	return (
		<div className="question--container">
			<h6 className="question--category">Category: "{props.category}"</h6>
			<h6 className="question--difficulty">Difficulty: "{props.difficulty}"</h6>
			<p className="question--question">{props.question}</p>
			<div className="question---answers">{buttonElements}</div>
			<div className="hr"></div>
		</div>
	);
}

export default Question;
