import React from 'react'
import { Input, Button } from "../elements";

const Signup = (props) => {
  return (
		<div>
			<Input placeholderText="아이디를">아이디</Input>
			<div />
			<Input placeholderText="닉네임을">닉네임</Input>
			<div />
			<Input placeholderText="비밀번호를">비밀번호</Input>
			<div />
			<Input placeholderText="비밀번호를 다시">비밀번호 확인</Input>
			<div />
			<Button>회원가입하기</Button>
		</div>
	);
}

export default Signup
