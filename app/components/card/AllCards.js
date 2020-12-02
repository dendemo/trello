import React from "react";
import { connect } from "react-redux";
import SingleCard from "./SingleCard";

const AllCards = ({ boardId, listId, cards, classProps }) => {
	const renderCards = () => {
		const thisCards = cards.filter(
			(card) => card.boardId == boardId && card.listId == listId
		);

		if (!thisCards.length) return;

		const insertCards = thisCards.map((card) => {
			return (
				<SingleCard
					key={card.id}
					cardId={card.id}
					title={card.title}
					sourceListId={listId}
					isArchived={card.isArchived}
				/>
			);
		});

		return <ul className={`all-cards ${classProps}`}>{insertCards}</ul>;
	};

	return <>{renderCards()}</>;
};

function mapStateToProps(state) {
	return {
		cards: state.cards,
	};
}

AllCards.defaultProps = {
	classProps: "",
};

export default connect(mapStateToProps)(AllCards);
