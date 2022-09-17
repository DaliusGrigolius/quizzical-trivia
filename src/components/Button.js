import React from "react";

function Button(props) {
	const styles = {
		backgroundColor: props.isHeld ? "#59E391" : "white",
	};
	return (
		<div className="answer--button" style={styles} onClick={props.handleClick}>
			<div>{props.value}</div>
		</div>
	);
}

export default Button;
