import React from 'react'
import styled from "styled-components";

const Button = (props) => {
  const { onClickButton, width, height, backgroundColor, border, disabled, children } = props; 
  const styles = { width, height, backgroundColor, border }

  return (
    <ButtonBox {...styles} disabled={disabled? true : null} type="button" onClick={() => onClickButton()}>
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
};

const ButtonBox = styled.button`
  background-color: ${({backgroundColor}) => backgroundColor} ;
  width: ${(props) => props.width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
`

export default Button
