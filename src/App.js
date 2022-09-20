import React from "react";
import { useState, useEffect } from "react";
import StartPage from "./components/StartPage.js";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
	const [start, setStart] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [game, setGame] = useState(false);
	const [checked, setChecked] = useState(false);
	const [score, setScore] = useState(0);

	function newGame() {
		setGame((prevVal) => !prevVal);
		setChecked(false);
		setScore(0);
	}

	function handleStartClick() {
		setStart((prevVal) => !prevVal);
	}

	useEffect(() => {
		fetch("https://the-trivia-api.com/api/questions?limit=5&region=LT")
			.then((resp) => resp.json())
			.then((data) => {
				setQuestions(modifyData(data));
			})
			.catch((err) => console.log(err));
	}, [game]);

	function modifyData(questionsArray) {
		const decentQuestions = questionsArray.map((question) => {
			return {
				id: question.id,
				question: question.question,
				correctAnswer: question.correctAnswer,
				answers: settingAnswers(
					shuffleAnswers([...question.incorrectAnswers, question.correctAnswer]),
					question.correctAnswer
				),
				category: question.category,
				difficulty: question.difficulty,
			};
		});
		return decentQuestions;
	}

	function settingAnswers(shuffledAnswers, correctAnswer) {
		return shuffledAnswers.map((answer) => {
			return {
				isHeld: false,
				answer: answer,
				correct: answer === correctAnswer ? true : false,
				id: nanoid(),
				heldCorrect: false,
				heldIncorrect: false,
				checked: false,
			};
		});
	}

	function shuffleAnswers(array) {
		return array.sort(() => Math.random() - 0.5);
	}

	const questionElements = questions.map((question) => (
		<Question
			id={question.id}
			key={question.id}
			category={question.category}
			difficulty={question.difficulty}
			question={question.question}
			answers={question.answers}
			checkHold={checkHold}
		/>
	));

	function checkHold(answerId, questionId) {
		setQuestions((prevQuestions) =>
			prevQuestions.map((question) => {
				if (question.id === questionId) {
					const answersList = question.answers.map((answer) => {
						if (answer.id === answerId || answer.isHeld) {
							return {
								...answer,
								isHeld: !answer.isHeld,
							};
						} else {
							return answer;
						}
					});
					return {
						...question,
						answers: answersList,
					};
				} else {
					return question;
				}
			})
		);
	}

	function checkAnswers() {
		setQuestions((prevQuestions) =>
			prevQuestions.map((question) => {
				const checkedAnswers = question.answers.map((answer) => {
					if (answer.isHeld && !answer.correct) {
						return {
							...answer,
							heldIncorrect: true,
							checked: true,
						};
					} else if (answer.isHeld && answer.correct) {
						setScore((prevScore) => prevScore + 1);
						return {
							...answer,
							heldCorrect: true,
							checked: true,
						};
					} else {
						return {
							...answer,
							checked: true,
						};
					}
				});
				return {
					...question,
					answers: checkedAnswers,
				};
			})
		);
		setChecked(true);
	}

	return (
		<div>
			<div className="container">
				{start ? (
					<StartPage handleClick={handleStartClick} />
				) : (
					<div>
						<div className="container--question--elements">{questionElements}</div>
						<div className="container--button--elements">
							{checked ? (
								<div>
									<span className="score">
										You scored{" "}
										<span className={score < 5 ? "successless" : "successful"}>
											{score / 2}
										</span>
										/<span className="questions--total">5</span> correct answers
									</span>
									<button className="play--again" onClick={newGame}>
										Play again
									</button>
								</div>
							) : (
								<button className="check--answers" onClick={checkAnswers}>
									Check answers
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
