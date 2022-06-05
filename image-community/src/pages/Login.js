import React from "react";
import { Input, Button, Text } from "../elements";

const Login = (props) => {
	const onClickButton = () => {
		
	}

	return (
		<div style={{ padding: "16px" }}>
			<Text size="32px">로그인</Text>
			<Input placeholderText="아이디를">아이디</Input>
			<div />
			<Input type="password" placeholderText="비밀번호를">비밀번호</Input>
			<div />
			<Button width="80vw" onClickButton={()=>onClickButton()}>로그인하기</Button>
		</div>
	);
};

export default Login;
