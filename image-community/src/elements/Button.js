import React from 'react'
import styled from "styled-components";

const Button = (props) => {
  const { type, onClickButton, width, height, backgroundColor, border, disabled, children } = props; 
  const styles = { width, height, backgroundColor, border }

  return (
    <ButtonBox type={type} {...styles} disabled={disabled? true : null} onClick={() => onClickButton()}>
			{children}
		</ButtonBox>
	);
}

Button.defaultProps = {
	width: "80px",
	height: "40px",
  backgroundColor: "#C4C4C4",
  border: 0,
  disabled: false,
  type: "button",
};

const ButtonBox = styled.button`
  background-color: ${({backgroundColor}) => backgroundColor} ;
  width: ${(props) => props.width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
`

export default Button
