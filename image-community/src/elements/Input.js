import React from 'react'

const Input = (props) => {
  const { children, placeholderText } = props;

  return (
		<>
      <label>{children}</label>
      <div />
			<input type="text" placeholder={placeholderText + " 입력하세요"}></input>
		</>
	);
}

Input.defaultProps = {

}

const InputBox = {

}

export default Input
