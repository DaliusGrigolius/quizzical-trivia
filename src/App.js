import React from "react";
import { useState, useEffect } from "react";
import StartPage from "./components/StartPage.js";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
	const [start, setStart] = useState(true);
	const [questionsData, setQuestionsData] = useState([]);
	const [newGame, setNewGame] = useState(false);
	const [allChecked, setAllChecked] = useState(false);
	const [userScore, setUserScore] = useState(0);
	const [selected, setSelected] = useState(false);

	function startNewGame() {
		setNewGame((prevVal) => !prevVal);
		setAllChecked(false);
		setUserScore(0);
		setSelected(false);
	}

	function handleStartClick() {
		setStart((prevVal) => !prevVal);
	}

	useEffect(() => {
		fetch("https://the-trivia-api.com/api/questions?limit=5&region=LT")
			.then((resp) => resp.json())
			.then((data) => {
				setQuestionsData(modifyData(data));
			})
			.catch((err) => console.log(err));
	}, [newGame]);

	useEffect(() => {
		const selectedAnswers = questionsData.filter((q) =>
			q.answers.some((a) => a.isHeld)
		).length;
		selectedAnswers === 5 ? setSelected(true) : setSelected(false);
	}, [questionsData]);

	function modifyData(questionsArray) {
		const decentQuestions = questionsArray.map((question) => {
			return {
				id: question.id,
				question: question.question,
				correctAnswer: question.correctAnswer,
				answers: createAnswerObjects(
					shuffleAnswers([...question.incorrectAnswers, question.correctAnswer]),
					question.correctAnswer
				),
				category: question.category,
				difficulty: question.difficulty,
			};
		});
		return decentQuestions;
	}

	function createAnswerObjects(shuffledAnswers, correctAnswer) {
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

	const questionElements = questionsData.map((question) => (
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
		setQuestionsData((prevQuestions) =>
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
		setQuestionsData((prevQuestions) =>
			prevQuestions.map((question) => {
				const checkedAnswers = question.answers.map((answer) => {
					if (answer.isHeld && !answer.correct) {
						return {
							...answer,
							heldIncorrect: true,
							checked: true,
						};
					} else if (answer.isHeld && answer.correct) {
						setUserScore((prev) => prev + 1);
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
		selected ? setAllChecked(true) : setAllChecked(false);
	}

	return (
		<div>
			<div className="container">
				{start && <StartPage handleClick={handleStartClick} />}
				<div>
					{!start && (
						<div className="container--question--elements">{questionElements}</div>
					)}
					<div className="container--button--elements">
						{allChecked && (
							<div>
								<span className="score">
									You scored{" "}
									<span className={userScore < 5 ? "successless" : "successful"}>
										{userScore}
									</span>
									/<span className="questions--total">5</span> correct answers
								</span>
								<button className="play--again" onClick={startNewGame}>
									Play again
								</button>
							</div>
						)}
						{selected && !allChecked && (
							<button className="check--answers" onClick={checkAnswers}>
								Check answers
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
