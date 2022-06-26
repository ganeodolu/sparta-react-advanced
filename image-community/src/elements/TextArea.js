import React from 'react'
import styled from "styled-components";

const TextArea = (props) => {
  const { rows, cols, name, placeholder, children } = props;
  const styles = { rows, cols };
  return (
    <TextAreaBox>
      <label htmlFor={name}></label>
      <textarea
        {...styles}
        name={name}
        placeholder={placeholder}
      >
        {children}
      </textarea>
    </TextAreaBox>
  )
}

TextArea.defaultProps = {
  cols: 80,
  rows: 10,
};

const TextAreaBox = styled.div`
	width: ${(props) => props.width};
	height: ${({ height }) => height};
`;
export default TextArea
