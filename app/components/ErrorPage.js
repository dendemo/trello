import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="error-page">
			<h2 className="error-page__title">There is no such a page</h2>
			<Link to="/" className="error-page__link">
				Home
			</Link>
		</div>
	);
};

export default ErrorPage;
