//Emulate server requests by holding the state in the local storage
import { getRandomLag } from "Utils/helpers";

export const getStateFromStorage = (itemName, initialState) => {
	return new Promise((resolve, reject) => {
		const storage = localStorage.getItem(itemName),
			state = storage === null ? initialState : JSON.parse(storage);
		setTimeout(() => resolve(state), getRandomLag(300, 3000));
	});
};

export const saveStateIntoStorage = (state) => {
	try {
		localStorage.setItem("storage", JSON.stringify(state));
	} catch (e) {
		console.log(e);
		alert("Something went wrong while sending new data");
	}
};
