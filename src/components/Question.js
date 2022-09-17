import React, { useState, useEffect } from "react";
import Button from "./Button";
import { nanoid } from "nanoid";

function Question(props) {
	const [buttons, setButtons] = useState(allNewButtons());

	function allNewButtons() {
		const newButtons = [];
		const btns = [props.correctAnswer, ...props.incorrectAnswers];
		for (let i = 0; i < btns.length; i++) {
			newButtons.push(generateNewButton(btns[i]));
		}
		return newButtons;
	}

	function generateNewButton(value) {
		return {
			id: nanoid(),
			value: value,
			isHeld: false,
			isChosen: false,
		};
	}

	function holdSelected(id) {
		setButtons((oldButton) =>
			oldButton.map((btn) => {
				return btn.id === id
					? { ...btn, isHeld: true, isChosen: true }
					: { ...btn, isHeld: false, isChosen: false };
			})
		);
	}

	const buttonElements = buttons.map((btn) => (
		<Button
			id={btn.id}
			key={btn.id}
			value={btn.value}
			isHeld={btn.isHeld}
			handleClick={() => holdSelected(btn.id)}
		/>
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
