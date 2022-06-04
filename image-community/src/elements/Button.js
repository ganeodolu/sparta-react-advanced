import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();
  const { width, height, backgroundColor, border, address, children } = props;
  
  const onClickButton = (str) => {
    navigate(`/${str}`)
  }
  const styles = { width, height, backgroundColor, border }

  return (
    <ButtonBox {...styles} type="button" onClick={() => onClickButton(address)}>
			{children}
		</ButtonBox>
	);
}

Button.defaultProps = {
	width: "80px",
	height: "40px",
  backgroundColor: "#C4C4C4",
  border: 0,
};

const ButtonBox = styled.button`
  background-color: ${({backgroundColor}) => backgroundColor} ;
  width: ${(props) => props.width};
  height: ${({ height }) => height};
  border: ${({border}) => border};
`

export default Button
