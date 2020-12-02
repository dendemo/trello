import {
	SUBMIT_NEW_BOARD,
	SUBMIT_NEW_LIST,
	SUBMIT_NEW_CARD,
	REPLACE_CARD,
	SET_ARCHIVE,
	SET_FROM_STORAGE,
	SET_IS_FETCHED,
} from "Actions/types";
import { combineReducers } from "redux";

const setFetchReducer = (state = false, action) => {
	if (action.type === SET_IS_FETCHED) return true;

	return state;
};

const handleBoardReducer = (state = [], action) => {
	switch (action.type) {
		case SET_FROM_STORAGE:
			return action.payload.boards;
		case SUBMIT_NEW_BOARD:
			return [...state, action.payload];
		default:
			return state;
	}
};

const handleListReducer = (state = [], action) => {
	switch (action.type) {
		case SET_FROM_STORAGE:
			return action.payload.lists;
		case SUBMIT_NEW_LIST:
			return [...state, action.payload];
		default:
			return state;
	}
};

const handleCardReducer = (state = [], action) => {
	switch (action.type) {
		case SET_FROM_STORAGE:
			return action.payload.cards;
		case SUBMIT_NEW_CARD:
			return [...state, action.payload];
		case REPLACE_CARD:
			const { listId, nextId, currentIndex } = action.payload;

			const clonedState = [...state];

			const cardToReplace = clonedState.splice(currentIndex, 1)[0];

			cardToReplace.listId = listId;
			cardToReplace.id = nextId;

			clonedState.push(cardToReplace);

			return clonedState;
		case SET_ARCHIVE:
			const index = action.payload,
				cardToSet = state[index],
				currentStatus = cardToSet.isArchived;

			const newState = [...state];

			newState.splice(index, 1, { ...cardToSet, isArchived: !currentStatus });

			return newState;
		default:
			return state;
	}
};

export const rootReducer = combineReducers({
	boards: handleBoardReducer,
	lists: handleListReducer,
	cards: handleCardReducer,
	isFetched: setFetchReducer,
});
