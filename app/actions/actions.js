import {
	SUBMIT_NEW_BOARD,
	SUBMIT_NEW_LIST,
	SUBMIT_NEW_CARD,
	REPLACE_CARD,
	SET_ARCHIVE,
	SET_FROM_STORAGE,
	SET_IS_FETCHED,
} from "./types";
import { getNextId } from "Utils/helpers";
import { initialState, itemName } from "Utils/constants";
import { getStateFromStorage } from "Root/server";

export const setIsFetched = () => {
	return {
		type: SET_IS_FETCHED,
	};
};

export const submitNewBoard = (title) => {
	return (dispatch, getState) => {
		const { boards } = getState(),
			nextId = getNextId(boards);
		dispatch({
			type: SUBMIT_NEW_BOARD,
			payload: {
				id: nextId,
				title,
			},
		});
	};
};

export const submitNewList = (boardId, title) => {
	return (dispatch, getState) => {
		const { boards, lists } = getState(),
			nextId = getNextId(lists);

		dispatch({
			type: SUBMIT_NEW_LIST,
			payload: {
				id: nextId,
				title,
				boardId,
			},
		});
	};
};

export const submitNewCard = (boardId, listId, title) => {
	return (dispatch, getState) => {
		const { cards } = getState(),
			nextId = getNextId(cards);

		dispatch({
			type: SUBMIT_NEW_CARD,
			payload: {
				id: nextId,
				title,
				listId,
				boardId,
				isArchived: false,
			},
		});
	};
};

export const replaceCard = (cardId, listId) => {
	return (dispatch, getState) => {
		const { cards } = getState(),
			nextId = getNextId(cards);

		const currentIndex = cards.findIndex((card) => card.id == cardId);

		dispatch({
			type: REPLACE_CARD,
			payload: {
				listId,
				nextId,
				currentIndex,
			},
		});
	};
};

export const setArchive = (cardId) => {
	return (dispatch, getState) => {
		const { cards } = getState();

		const index = cards.findIndex((card) => card.id == cardId);

		dispatch({
			type: SET_ARCHIVE,
			payload: index,
		});
	};
};

export const setFromStorage = () => {
	return (dispatch) => {
		getStateFromStorage(itemName, initialState)
			.then((state) => {
				dispatch({
					type: SET_FROM_STORAGE,
					payload: state,
				});
			})
			.catch((e) => {
				console.log(e);
				alert(
					"Something went wrong during server request, please reload the page"
				);
			});
	};
};
