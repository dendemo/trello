import React from "react";
import AllBoards from "./board/AllBoards";
import SingleBoard from "./board/SingleBoard";
import { Switch, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const App = () => {
	return (
		<Switch>
			<Route exact path="/" component={AllBoards} />
			<Route exact path="/:id" component={SingleBoard} />
			<Route component={ErrorPage} />
		</Switch>
	);
};

export default App;
