import { useEffect, useState } from "react";
import "./App.css";
import Snake from "./Snake";
import Food from "./Food";

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
	const [direction, setDirection] = useState("");

	const moveSnake = () => {
		let dots = [...snakeDots];
		let head = dots[dots.length - 1];

		switch (direction) {
			case "UP":
				head = [head[0], head[1] - 2];
				break;
			case "DOWN":
				head = [head[0], head[1] + 2];
				break;
			case "LEFT":
				head = [head[0] - 2, head[1]];
				break;
			case "RIGHT":
				head = [head[0] + 2, head[1]];
				break;
			default:
				break;
		}
		// adding new head
		dots.push(head);
		// removing last dot
		dots.shift();
		setSnakeDots(dots);
	};

	const keyPressHandler = (e) => {
		switch (e.keyCode) {
			case 38:
				setDirection("UP");
				break;
			case 40:
				setDirection("DOWN");
				break;
			case 37:
				setDirection("LEFT");
				break;
			case 39:
				setDirection("RIGHT");
				break;
			default:
				setDirection("");
				break;
		}
		console.log(direction);
	};

	document.onkeydown = keyPressHandler;

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
