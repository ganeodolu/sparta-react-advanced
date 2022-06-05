import React from "react";
import styled from "styled-components";

const Input = (props) => {
	const { type, width, marginBottom, children, placeholderText } = props;
	const outerStyles = { marginBottom };
	const innerStyles = { width };

	return (
		<InputOuter {...outerStyles}>
			<label>{children}</label>
			<div />
			<InputInner
				{...innerStyles}
				type={type}
				placeholder={placeholderText + " 입력하세요"}
			></InputInner>
		</InputOuter>
	);
};

Input.defaultProps = {
	width: "80vw",
  marginBottom: "20px",
  type: 'text',
};

const InputOuter = styled.div`
	margin-bottom: ${({ marginBottom }) => marginBottom};
`;

const InputInner = styled.input`
	width: ${({ width }) => width};
`;
export default Input;
