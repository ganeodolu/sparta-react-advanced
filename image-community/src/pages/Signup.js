import React, { useState } from "react";
import { Input, Button, Text } from "../elements";

const Signup = (props) => {
	const [state, setState] = useState({
		password: "",
		passwordConfirm: "",
	});
	const onChangeInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const onClickButton = (e) => {
		e.preventDefault();
		if (state.password.length < 4) {
			alert('비밀번호는 4자이상입니다')
			return
		}

		return state.password === state.passwordConfirm
			? alert("가입성공")
			: alert("비밀번호가 다릅니다");
	};

	return (
		<form style={{ padding: "16px" }}>
			<Text size="32px">회원가입</Text>
			<Input placeholderText="아이디를">아이디</Input>
			<div />
			<Input placeholderText="닉네임을">닉네임</Input>
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
			<Input
				name="passwordConfirm"
				type="password"
				placeholderText="비밀번호를 다시"
				value={state.passwordConfirm}
				onChange={onChangeInput}
			>
				비밀번호 확인
			</Input>
			<div />
			<Button
				type="submit"
				width="80vw"
				onClickButton={onClickButton}
			>
				회원가입하기
			</Button>
		</form>
	);
};

export default Signup;
