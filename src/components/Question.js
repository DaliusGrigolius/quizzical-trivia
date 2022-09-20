import React from "react";
import Answer from "./Answer";

function Question(props) {
	function checkHold(id) {
		props.checkHold(id, props.id);
	}

	const answerElements = props.answers.map((answer) => {
		return (
			<Answer
				answer={answer.answer}
				isHeld={answer.isHeld}
				checkHold={() => checkHold(answer.id)}
				questionId={props.id}
				key={answer.id}
				id={answer.id}
				correct={answer.correct}
				heldCorrect={answer.heldCorrect}
				heldIncorrect={answer.heldIncorrect}
				checked={answer.checked}
			/>
		);
	});

	return (
		<div className="question--container">
			<h6 className="question--category">Category: "{props.category}"</h6>
			<h6 className="question--difficulty">Difficulty: "{props.difficulty}"</h6>
			<p className="question--question">{props.question}</p>
			<div className="question---answers">{answerElements}</div>
			<div className="hr"></div>
		</div>
	);
}

export default Question;
