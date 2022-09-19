import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Question(props) {
	const [buttons, setButtons] = useState(allNewButtons());
	// -----------------------------
	useEffect(() => {
		props.setAnswers(buttons); // cia reik kazkaip parasyt kad islaikyti jau esama buttons ir prideti tik ta nauja kur pasiupdatina paspaudus
	}, [buttons]);
	// -----------------------------
	function allNewButtons() {
		const newButtons = [];
		const incorrectBtns = [...props.incorrectAnswers];
		for (let i = 0; i < incorrectBtns.length; i++) {
			newButtons.push(generateNewButton(incorrectBtns[i], false));
		}
		newButtons.push(generateNewButton(props.correctAnswer, true));
		return shuffleArray(newButtons);
	}

	function generateNewButton(value, bool) {
		return {
			id: nanoid(),
			value: value,
			isChosen: false,
			isCorrect: bool,
			isChecked: false,
			qId: props.id,
		};
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

	function handleClick(id) {
		setButtons((oldButton) =>
			oldButton.map((btn) => {
				return btn.id === id
					? { ...btn, isChosen: true }
					: { ...btn, isChosen: false };
			})
		);
	}

	const buttonElements = buttons.map((btn) => (
		<button
			className="answer--button"
			key={btn.id}
			style={{
				backgroundColor: btn.isChosen ? "#59E391" : "#293264",
				color: btn.isChosen ? "#293264" : "white",
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
