import React from "react";

const Button = (props) => {
	return (
		<button type={props.type} className={`button ${props.classProps}`}>
			{props.name}
			{props.children}
		</button>
	);
};

Button.defaultProps = {
	type: "button",
	name: "",
	classProps: "",
};

export default Button;
