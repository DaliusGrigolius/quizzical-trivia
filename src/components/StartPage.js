import React from "react";

function startPage(props) {
	return (
		<div className="startPage--container">
			<h1 className="startPage--title">Quizzical</h1>
			<p className="startPage--description">
				Test your knowledge on a variety of topics!
			</p>
			<button className="start-button" onClick={props.handleClick}>
				Start quiz
			</button>
		</div>
	);
}

export default startPage;
