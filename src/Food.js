import React from "react";

function Food({ foodDots }) {
	const style = {
		left: `${foodDots[0]}%`,
		top: `${foodDots[1]}%`,
	};

	return <div className="snake__food" style={style}></div>;
}

export default Food;
