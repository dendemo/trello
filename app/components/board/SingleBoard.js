import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateListLink from "../list/CreateListLink";
import Form from "../Form";
import Button from "../Button";
import AllLists from "../list/AllLists";
import ErrorPage from "../ErrorPage";
import Icon from "../Icon";
import { connect } from "react-redux";
import { submitNewList, setFromStorage } from "Actions/actions";

const SingleBoard = ({
	board,
	match,
	submitNewList,
	setFromStorage,
	isFetched,
}) => {
	useEffect(() => {
		if (isFetched) return;

		setFromStorage();
	}, []);

	const [createMode, setCreateMode] = useState(false);

	if (!isFetched) return <p>"Loading..."</p>;

	if (!board) return <ErrorPage />;

	const goToLists = () => {
		setCreateMode(false);
	};
	const goToForm = () => {
		setCreateMode(true);
	};

	return (
		<div className="single-board">
			<div className="single-board__row">
				<Link to="/" className="single-board__link">
					<Icon classProps="icon_left-circled icon_m" />
				</Link>
				<h3 className="single-board__title">{board.title}</h3>
			</div>
			<AllLists boardId={board.id} />
			{createMode ? (
				<Form
					submitAction={(title) => submitNewList(board.id, title)}
					resetAction={goToLists}
					errorMsg="You have to name your new list"
					placeholder={"Name your list"}
					classProps="form_animated"
				>
					<Button type="reset" classProps="button_round form__button_round">
						<Icon classProps="icon_cancel icon_s" />
					</Button>
				</Form>
			) : (
				<CreateListLink handleClick={goToForm} />
			)}
		</div>
	);
};

function mapStateToProps(state, props) {
	return {
		board: state.boards[props.match.params.id],
		isFetched: state.isFetched,
	};
}

export default connect(mapStateToProps, { submitNewList, setFromStorage })(
	SingleBoard
);
