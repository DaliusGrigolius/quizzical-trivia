import React from "react";

function Answer(props) {
	let answerStyle = {};

	if (props.checked && props.correct) {
		answerStyle = {
			backgroundColor: "#2cc989",
			color: "#293264",
		};
	} else if (props.checked && props.heldIncorrect) {
		answerStyle = {
			backgroundColor: "pink",
			color: "#293264",
		};
	} else {
		answerStyle = {
			backgroundColor: props.isHeld ? "green" : "#293264",
			color: "wheat",
		};
	}
	return (
		<div className="answer--button" style={answerStyle} onClick={props.checkHold}>
			{props.answer}
		</div>
	);
}

export default Answer;
