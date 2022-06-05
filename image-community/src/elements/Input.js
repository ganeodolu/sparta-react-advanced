import React from "react";
import styled from "styled-components";

const Input = (props) => {
	const { width, marginBottom, children, placeholderText } = props;
	const styles = { marginBottom };
	const innerStyles = { width };

	return (
		<InputOuter {...styles}>
			<label>{children}</label>
			<div />
			<InputInner
				{...innerStyles}
				type="text"
				placeholder={placeholderText + " 입력하세요"}
			></InputInner>
		</InputOuter>
	);
};

Input.defaultProps = {
	width: "80vw",
	marginBottom: "20px",
};

const InputOuter = styled.div`
	margin-bottom: ${({ marginBottom }) => marginBottom};
`;

const InputInner = styled.input`
	width: ${({ width }) => width};
`;
export default Input;
