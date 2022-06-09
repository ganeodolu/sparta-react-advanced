import React, { useState } from "react";
import { Input, Button, Text } from "../elements";
import { useDispatch } from "react-redux"; 
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch(); 
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
	const onClickButton = (key, value) => {
		dispatch(userActions.logInAction({ userName: 'perl' }))
		navigate('/');
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
			<Button width="80vw" onClickButton={() => onClickButton()}>
				로그인하기
			</Button>
		</div>
	);
};

export default Login;
