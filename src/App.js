import { useEffect, useState } from "react";
import "./App.css";
import Snake from "./Snake";
import Food from "./Food";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const getDirection = (e) => {
	switch (e.keyCode) {
		case 38:
			return "UP";
		case 40:
			return "DOWN";
		case 37:
			return "LEFT";
		case 39:
			return "RIGHT";
		default:
			return;
	}
};

function App() {
	const getRandomFoodDot = () => {
		let min = 1;
		let max = 98;

		let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
		let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

		return [x, y];
	};

	const [snakeDots, setSnakeDots] = useState([
		[0, 0],
		[2, 0],
	]);
	const [foodDots, setFoodDots] = useState(getRandomFoodDot());
	const [direction, setDirection] = useState({ val: "RIGHT" });
	const [lastDirection, setLastDirection] = useState();
	const [speed, setSpeed] = useState(200);
	const [gameOver, setGameOver] = useState(true);
	const [startGame, setStartGame] = useState(false);

	const moveSnake = () => {
		let dots = [...snakeDots];
		let head = dots[dots.length - 1];
		switch (direction.val) {
			case "UP":
				setLastDirection(direction);
				head = [head[0], head[1] - 2];
				dots.push(head);
				dots.shift();
				break;
			case "DOWN":
				setLastDirection(direction);
				head = [head[0], head[1] + 2];
				dots.push(head);
				dots.shift();
				break;
			case "LEFT":
				setLastDirection(direction);
				head = [head[0] - 2, head[1]];
				dots.push(head);
				dots.shift();
				break;
			case "RIGHT":
				setLastDirection(direction);
				head = [head[0] + 2, head[1]];
				dots.push(head);
				dots.shift();
				break;
			default:
				setDirection(lastDirection);
				break;
		}
		setSnakeDots(dots);
	};

	useEffect(() => {
		if (gameOver) {
			const interval = setInterval(() => {
				moveSnake();
				checkIfCollapsed();
				checkIfOutOfBorders();
				checkIfEat();
			}, speed);
			return () => clearInterval(interval);
		}
	}, [snakeDots, gameOver]);

	useEffect(() => {
		const keyPressHandler = (e) => {
			setDirection({ val: getDirection(e) });
		};
		document.addEventListener("keydown", keyPressHandler);
		return () => {
			document.removeEventListener("keydown", keyPressHandler);
		};
	}, []);

	const checkIfEat = () => {
		let head = snakeDots[snakeDots.length - 1];
		let food = foodDots;
		if (head[0] == food[0] && head[1] == food[1]) {
			setFoodDots(getRandomFoodDot);
			extendSnake();
			// increseSpeed();
		}
	};

	const extendSnake = () => {
		let newSnake = [...snakeDots];
		newSnake.unshift([]);
		setSnakeDots(newSnake);
	};

	// we need increse speed?
	const increseSpeed = () => {
		setSpeed(speed - 5);
	};

	const checkIfOutOfBorders = () => {
		let head = snakeDots[snakeDots.length - 1];
		console.log(head);
		if (head[0] == 100 || head[1] == 100 || head[0] < 0 || head[1] < 0) {
			onGameOver();
		}
	};

	const checkIfCollapsed = () => {
		let snake = [...snakeDots];
		let head = snake[snake.length - 1];
		snake.pop();
		snake.forEach((dot) => {
			if (head[0] == dot[0] && head[1] == dot[1]) {
				onGameOver();
			}
		});
	};

	const onGameOver = () => {
		setSpeed(200);
		setDirection({ val: "RIGHT" });
		setLastDirection({ direction });
		setGameOver(false);
		setSnakeDots([
			[0, 0],
			[2, 0],
		]);
	};

	return (
		<div className="app">
			<div className="snake">
				<div className="snake__game">
					<Snake snakeDots={snakeDots} />
					<Food foodDots={foodDots} />
				</div>
			</div>
			<div className="app__buttons">
				{startGame ? (
					""
				) : (
					<>
						<Button
							className="app__button"
							variant="contained"
							color="primary"
							endIcon={<PlayArrowIcon>Start</PlayArrowIcon>}
							onClick={() => {
								setStartGame(true);
							}}
						>
							PLAY
						</Button>
					</>
				)}
				{gameOver ? (
					""
				) : (
					<>
						<Button
							className="app__button"
							variant="contained"
							color="primary"
							endIcon={<PlayArrowIcon>Start</PlayArrowIcon>}
							onClick={() => {
								setGameOver(true);
							}}
						>
							PLAY AGAIN
						</Button>
						<p className="app__gameOver">GAME OVER</p>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
