import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "Reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { saveStateIntoStorage } from "./server";
import { setIsFetched } from "Actions/actions";
import { throttle, compareStates, copyStates } from "Utils/helpers";

const middleware = applyMiddleware(thunk);

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

let previousState = {
	boards: null,
	lists: null,
	cards: null,
};

//Listen changes and send new state to the storage
store.subscribe(
	//If the state is not updated, do nothing
	//If the state is updated more then twice in x ms, then throttle it
	throttle(
		() => {
			const { isFetched } = store.getState();
			//If it's the first request, set a flag and return, so as not to send the same state back to the storage
			if (!isFetched) {
				store.dispatch(setIsFetched());
				return;
			}
			//Take a new state and save it in the storage
			const { boards, lists, cards } = store.getState();
			saveStateIntoStorage({ boards, lists, cards });
		},
		3000,
		//Function to check if the state was updated
		() => {
			const currentState = store.getState();

			const isEqual = compareStates(previousState, currentState);

			copyStates(currentState, previousState);

			return isEqual;
		}
	)
);

export { store };
