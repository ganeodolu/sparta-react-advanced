import React from "react";
import styled from "styled-components";

const Button = (props) => {
	const {
		type,
		onClickButton,
		width,
		height,
		backgroundColor,
		border,
		// isValidPassword,
		// disabled,
		children,
	} = props;
	// console.log(disabled())
	const styles = { width, height, backgroundColor, border };

	return (
		<ButtonBox
			type={type}
			{...styles}
			// disabled={() => disabled()}
			onClick={onClickButton && ((e) => onClickButton(e))}
		>
			{children}
		</ButtonBox>
	);
};

Button.defaultProps = {
	width: "80px",
	height: "40px",
	backgroundColor: "#C4C4C4",
	border: 0,
	disabled: false,
	type: "button",
	onClickButton: null,
	// isValidPassword: null,
};

const ButtonBox = styled.button`
	background-color: ${({ backgroundColor }) => backgroundColor};
	width: ${(props) => props.width};
	height: ${({ height }) => height};
	border: ${({ border }) => border};
`;

export default Button;
