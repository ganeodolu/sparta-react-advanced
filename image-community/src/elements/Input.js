import React from "react";
import styled from "styled-components";
import { Text, Grid } from './index';

const Input = (props) => {
	const {
		name,
		onChange,
		value,
		minLength,
		type,
		width,
		marginBottom,
		children,
		multiline,
		placeholderText,
	} = props;
	const outerStyles = { marginBottom };
	const innerStyles = { width };

	if (multiline) {
		return (
			<Grid>
				<Text>{children}</Text>
				<ElTextarea
					rows={8}
					placeholder={placeholderText}
					onChange={onChange}
				></ElTextarea>
			</Grid>
		)
	}

	return (
		<InputOuter {...outerStyles}>
			<label htmlFor={name}>{children}</label>
			<div />
			<InputInner
				{...innerStyles}
				name={name}
				onChange={onChange && ((e) => onChange(e))}
				value={value}
				type={type}
				minlength={minLength}
				placeholder={placeholderText + " 입력하세요"}
			></InputInner>
		</InputOuter>
	);
};

Input.defaultProps = {
	multiline: false,
	width: "80vw",
	marginBottom: "20px",
	type: "text",
	minLength: "4",
	onChange: () => {}
};

const InputOuter = styled.div`
	margin-bottom: ${({ marginBottom }) => marginBottom};
`;

const InputInner = styled.input`
	width: ${({ width }) => width};
`;

const ElTextarea = styled.textarea`
	border: 1px solid #212121;
	width: 100%;
	padding: 12px 4px;
	box-sizing: border-box;
`;

export default Input;
