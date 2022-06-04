import React from 'react'
import styled from "styled-components";

const Input = (props) => {
  const { marginBottom, children, placeholderText } = props;
  const styles = { marginBottom };
  return (
		<InputBox {...styles}>
      <label>{children}</label>
      <div />
			<input type="text" placeholder={placeholderText + " 입력하세요"}></input>
		</InputBox>
	);
}

Input.defaultProps = {
  marginBottom: '20px',
}

const InputBox = styled.div`
  margin-bottom: ${({ marginBottom }) => marginBottom};
`

export default Input
