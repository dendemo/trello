import React from "react";
import { setArchive } from "Actions/actions";
import { connect } from "react-redux";

const SingleCard = ({
	title,
	cardId,
	sourceListId,
	setArchive,
	isArchived,
}) => {
	const handleDragStart = (e) => {
		const data = JSON.stringify({ cardId, sourceListId });

		e.dataTransfer.setData("text", data);
	};

	const handleClick = () => {
		setArchive(cardId);
	};

	return (
		<li draggable={true} onDragStart={handleDragStart} className="single-card">
			<div
				className={`single-card__item ${
					isArchived ? "single-card__item_done" : "single-card__item_active"
				}`}
			>
				<p className="single-card__title">{title}</p>
				<button
					className={`single-card__btn ${
						isArchived ? "single-card__btn_done" : "single-card__btn_active"
					}`}
					onClick={handleClick}
				></button>
			</div>
		</li>
	);
};

export default connect(null, { setArchive })(SingleCard);
