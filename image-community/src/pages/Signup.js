import React, { useState } from "react";
import { Input, Button, Text } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		id: "",
		userName: "",
		password: "",
		passwordConfirm: "",
	});
	const onChangeInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};


	const isValidInputs = () => {
		if (state.id.length < 1) {
			return false
		}
		if (state.userName.length < 1) {
			return false
		}
		// firebase에서 체크 6자이상
		// if (state.password.length < 4) {
		// 	alert("비밀번호는 4자이상입니다");
		// 	return false;
		// }
		if (state.password !== state.passwordConfirm) {
			alert("비밀번호가 다릅니다");
			return false;
		}
		
		return true;
	};
	const isValid = state.password < 4 || state.password !== state.passwordConfirm;

	const onClickButton = (e) => {
		e.preventDefault();
		if (isValidInputs) {
			dispatch(userActions.signupFB(state.id, state.password, state.userName));
			navigate("/");
		}
	};

	return (
		<form style={{ padding: "16px" }}>
			<Text size="32px">회원가입</Text>
			<Input
				name="id"
				value={state.id}
				onChange={onChangeInput}
				placeholderText="아이디를"
			>
				아이디
			</Input>
			<div />
			<Input
				name="userName"
				value={state.userName}
				onChange={onChangeInput}
				placeholderText="닉네임을"
			>
				닉네임
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
				disabled={isValid}
				onClickButton={onClickButton}
			>
				회원가입하기
			</Button>
		</form>
	);
};

export default Signup;
