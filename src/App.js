import { useState } from "react";
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
	const [direction, setDirection] = useState("RIGHT");

	// const handleKey = (e) => {
	// 	onkeydown(setDirection("test"));
	// };

	// onKeyDown(setDirection("test"));
	// console.log(snakeDots);

	const checkKeyPress = (e) => {
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
	};
	window.addEventListener("keydown", checkKeyPress, false);

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
