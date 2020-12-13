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
			console.log(direction);
		}, 200);
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

	return (
		<div className="app">
			<div className="snake">
				<Snake snakeDots={snakeDots} />
				<Food foodDots={foodDots} />
			</div>
		</div>
	);
}

export default App;
