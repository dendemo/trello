import React from "react";

const Icon = ({ classProps }) => {
	return <span className={`icon ${classProps}`}></span>;
};

Icon.defaultProps = {
	classProps: "",
};

export default Icon;
