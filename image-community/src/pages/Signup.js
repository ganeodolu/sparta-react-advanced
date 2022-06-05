import React from 'react'
import { Input, Button, Text } from "../elements";

const Signup = (props) => {

  return (
		<form style={{ padding: "16px" }}>
			<Text size="32px">회원가입</Text>
			<Input placeholderText="아이디를">아이디</Input>
			<div />
			<Input placeholderText="닉네임을">닉네임</Input>
			<div />
			<Input type="password" placeholderText="비밀번호를">
				비밀번호
			</Input>
			<div />
			<Input type="password" placeholderText="비밀번호를 다시">
				비밀번호 확인
			</Input>
			<div />
			<Button disabled={true} width="80vw" type="submit">
				회원가입하기
			</Button>
		</form>
	);
}

export default Signup
