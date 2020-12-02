import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Form = (props) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(props.errorMsg);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const inputRef = useRef(null);
	const errorRef = useRef(null);
	const isMountedRef = useRef(null);
	//Use flag to prevent changing state on unmounted component
	useEffect(() => {
		isMountedRef.current = true;

		return () => (isMountedRef.current = false);
	}, []);
	//Add listener to correct errorMsg position
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		inputRef.current.focus();

		return () => window.removeEventListener("scroll", handleScroll);
	});
	//Empty string is not allowed
	const validate = (value) => {
		if (value.trim() === "") {
			setError(props.errorMsg);
			return;
		}

		setError(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//If errorMsg is already shown, then just return
		if (isSubmitted) return;

		setIsSubmitted(true);
		//If validation failed
		if (error) return;
		//If validation succeeded
		props.submitAction(value);
		handleReset();
	};

	const handleChange = (e) => {
		setValue(e.target.value);

		setIsSubmitted(false);
		validate(e.target.value);
	};

	const handleReset = () => {
		setValue("");
		setIsSubmitted(false);
		setError(props.errorMsg);

		if (props.resetAction) props.resetAction();
	};

	const handleScroll = () => {
		if (errorRef.current === null) return;

		errorRef.current.style.transform = `translate(-${window.pageXOffset}px, -${window.pageYOffset}px)`;
	};

	const showErrorMsg = () => {
		//Get coords to place msg beside an input
		const relativeCoords = inputRef.current.getBoundingClientRect();

		const style = {
			position: "fixed",
			top: `${relativeCoords.bottom}px`,
			left: `${relativeCoords.left}px`,
		};
		//Hide msg after amount of time
		setTimeout(() => {
			//If component was unmounted do not change state
			if (isMountedRef.current) setIsSubmitted(false);
		}, 3000);

		return ReactDOM.createPortal(
			<div className="form__error" style={style} ref={errorRef}>
				{error}
			</div>,
			document.body
		);
	};

	return (
		<form
			onSubmit={handleSubmit}
			onReset={handleReset}
			className={`form ${props.classProps}`}
		>
			<input
				ref={inputRef}
				className="form__control"
				type="text"
				onChange={handleChange}
				value={value}
				placeholder={props.placeholder}
			/>
			{isSubmitted && error && showErrorMsg()}
			{props.children}
		</form>
	);
};

Form.defaultProps = {
	classProps: "",
	errorMsg: "The field is required",
};

export default Form;
