import { useEffect, useState } from "react";
import "./App.css";
import Snake from "./Snake";
import Food from "./Food";

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
		const interval = setInterval(() => {
			moveSnake();
			checkIfOutOfBorders();
			checkIfEat();
		}, speed);
		return () => clearInterval(interval);
	}, [snakeDots]);

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

	// // we need increse speed?
	// const increseSpeed = () => {
	// 	if (speed > 10) {
	// 		setSpeed(speed - 10);
	// 	}
	// };

	const checkIfOutOfBorders = () => {
		let head = snakeDots[snakeDots.length - 1];
		if (head[0] == 100 || head[1] == 100 || head[0] < 0 || head[1] < 0) {
			onGameOver();
		}
	};

	const onGameOver = () => {
		setSpeed(50);
		setDirection({ val: "RIGHT" });
		setLastDirection({ direction });
		setSnakeDots([
			[0, 0],
			[2, 0],
		]);
	};

	return (
		<div className="app">
			<p>{snakeDots.length}</p>
			<div className="snake">
				<Snake snakeDots={snakeDots} />
				<Food foodDots={foodDots} />
			</div>
		</div>
	);
}

export default App;
