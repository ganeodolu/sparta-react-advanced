import React from 'react'
import { Input, Button } from '../elements'

const Login = (props) => {
  return (
		<div>
			<Input placeholderText="아이디를">아이디</Input>
			<div />
      <Input placeholderText="비밀번호를">비밀번호</Input>
      <div />
      <Button>로그인하기</Button>
		</div>
	);
}

export default Login
