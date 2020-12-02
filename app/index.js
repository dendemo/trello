import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App";
import { Provider } from "react-redux";
import { store } from "./Store";
import { HashRouter } from "react-router-dom";
import "./sass/main.scss";

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById("root")
);
