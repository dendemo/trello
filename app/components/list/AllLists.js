import React from "react";
import SingleList from "./SingleList";
import { connect } from "react-redux";

const allLists = ({ boardId, lists }) => {
	const renderAllLists = () => {
		const thisLists = lists.filter((list) => list.boardId == boardId);

		if (!thisLists.length) return;

		const insertLists = thisLists.map((list) => {
			return (
				<SingleList
					key={list.id}
					boardId={boardId}
					listId={list.id}
					title={list.title}
					classProps="single-board__single-list"
				/>
			);
		});

		return <>{insertLists}</>;
	};

	return <>{renderAllLists()}</>;
};

function mapPropsToState(state) {
	return {
		lists: state.lists,
	};
}

export default connect(mapPropsToState)(allLists);
