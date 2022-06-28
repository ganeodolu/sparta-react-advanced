import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";

const Header = () => {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.user.isLogIn);
	const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
	const isSession = sessionStorage.getItem(_sessionKey) ? true : false;

	const navigate = useNavigate();
	const onClickButton = (str) => {
		navigate(`/${str}`);
	};
	const onClickLogoutButton = () => {
		dispatch(userActions.logOutFB());
		navigate("/", { replace: true });
	};

	if (isLogin && isSession) {
		return (
			<>
				<Grid isFlex padding="4px 16px">
					<Grid>
						<Button onClickButton={() => onClickButton("")}>홈</Button>
					</Grid>
					<Grid isFlex padding="4px 16px">
						<Button onClickButton={() => onClickButton("")}>내 정보</Button>
						<Button onClickButton={() => onClickButton("notification")}>알림</Button>
						<Button onClickButton={() => onClickLogoutButton()}>
							로그아웃
						</Button>
					</Grid>
				</Grid>
			</>
		);
	}

	return (
		<>
			<Grid isFlex padding="4px 16px">
				<Grid>
					<Button onClickButton={() => onClickButton("")}>홈</Button>
				</Grid>
				<Grid isFlex padding="4px 16px">
					<Button onClickButton={() => onClickButton("login")}>로그인</Button>
					<Button onClickButton={() => onClickButton("signup")}>
						회원가입
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default Header;
