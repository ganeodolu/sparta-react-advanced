import React, { useState } from "react";
import { Input, Button, Text } from "../elements";
import Cookie from "../shared/Cookie";

const Login = (props) => {
	const [state, setState] = useState({
		id: "",
		password: "",
	})
	const onChangeInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	const onClickButton = (userId, userPassword) => {
		Cookie.set('userId', userId, 3)
		Cookie.set('userPwd', userPassword, 3)
		Cookie.get('userId')
		Cookie.del('userPwd')
	};

	return (
		<div style={{ padding: "16px" }}>
			<Text size="32px">로그인</Text>
			<Input
				name="id"
				placeholderText="아이디를"
				value={state.id}
				onChange={onChangeInput}
			>
				아이디
			</Input>
			<div />
			<Input
				name="password"
				type="password"
				placeholderText="비밀번호를"
				value={state.password}
				onChange={onChangeInput}
			>
				비밀번호
			</Input>
			<div />
			<Button width="80vw" onClickButton={() => onClickButton(state.id, state.password)}>
				로그인하기
			</Button>
		</div>
	);
};

export default Login;
