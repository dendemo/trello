import React from "react";

const CreateListLink = ({ handleClick, classProps }) => {
	return (
		<button className={`create-list-link ${classProps}`} onClick={handleClick}>
			Add a new list...
		</button>
	);
};

CreateListLink.defaultProps = {
	classProps: "",
};

export default CreateListLink;
