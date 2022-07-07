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
		onSubmit,
	} = props;
	const outerStyles = { marginBottom };
	const innerStyles = { width };

	if (multiline) {
		return (
			<Grid>
				<Text>{children}</Text>
				<ElTextarea
					name={name}
					rows={8}
					value={value}
					placeholder={placeholderText}
					onChange={onChange}
				></ElTextarea>
			</Grid>
		);
	}

	return (
		<InputOuter {...outerStyles}>
			<label htmlFor={name}>{children}</label>
			<div />
			<InputInner
				{...innerStyles}
				name={name}
				onChange={(e) => onChange(e)}
				value={value}
				type={type}
				minlength={minLength}
				placeholder={placeholderText + " 입력하세요"}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						onSubmit(e);
					}
				}}
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
	value: "",
	onChange: () => {},
	is_submit: false,
	onSubmit: () => {},
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
