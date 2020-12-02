import React, { useEffect, useState } from "react";
import BoardLink from "./BoardLink";
import Form from "../Form";
import Button from "../Button";
import { Link } from "react-router-dom";
import { submitNewBoard } from "Actions/actions";
import { connect } from "react-redux";
import { setFromStorage } from "Actions/actions";

const AllBoards = ({ boards, submitNewBoard, setFromStorage, isFetched }) => {
	useEffect(() => {
		if (isFetched) return;

		setFromStorage();
	}, []);

	const [createMode, setCreateMode] = useState(false);

	if (!isFetched) return <p>"Loading..."</p>;

	const goToBoards = () => {
		setCreateMode(false);
	};

	const goToForm = (e) => {
		e.preventDefault();

		setCreateMode(true);
	};

	const renderAllBoards = () => {
		if (!boards.length) return null;

		return boards.map((board) => {
			return (
				<Link key={board.id} to={`/${board.id}`} className="all-boards__link">
					<BoardLink classProps="board-link_simple board-link_clickable">
						<h2 className="board-link__title">{board.title}</h2>
					</BoardLink>
				</Link>
			);
		});
	};

	return (
		<div className="all-boards">
			{createMode ? (
				<BoardLink classProps="board-link_highlighted all-boards__board-link">
					<h2 className="board-link__title board-link__title_highlighted board-link__title_crown">
						Creating a board
					</h2>
					<Form
						classProps="board-link__form"
						submitAction={(title) => submitNewBoard(title)}
						resetAction={goToBoards}
						errorMsg="You have to name your new board"
						placeholder="Add a new board"
					>
						<Button
							type="reset"
							classProps="button_rect button_light form__button"
							name="Cancel"
						/>
						<Button
							type="submit"
							classProps="button_rect button_simple form__button"
							name="Submit"
						/>
					</Form>
				</BoardLink>
			) : (
				<a href="#" className="all-boards__link" onClick={goToForm}>
					<BoardLink classProps="board-link_highlighted board-link_clickable">
						<h2 className="board-link__title board-link__title_highlighted">
							Create new board...
						</h2>
					</BoardLink>
				</a>
			)}
			{renderAllBoards()}
		</div>
	);
};

function mapStateToProps(state) {
	return {
		boards: state.boards,
		isFetched: state.isFetched,
	};
}

export default connect(mapStateToProps, {
	submitNewBoard,
	setFromStorage,
})(AllBoards);
