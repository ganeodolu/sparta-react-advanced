import React from "react";
import { Grid, Button } from "../elements";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from './firebase';

const Header = () => {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.user.isLogIn);
	const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
	const isSession = sessionStorage.getItem(_sessionKey) ? true : false;

	const navigate = useNavigate();
	const onClickButton = (str) => {
		navigate(`/${str}`);
	};
	const onClickLogoutButton = () => dispatch(userActions.logOut({}));

	if (isLogin && isSession) {
		return (
			<>
				<Grid is_flex padding="4px 16px">
					<Grid>
						<Button onClickButton={() => onClickButton("")}>홈</Button>
					</Grid>
					<Grid is_flex padding="4px 16px">
						<Button onClickButton={() => onClickButton("")}>내 정보</Button>
						<Button onClickButton={() => onClickButton("login")}>알림</Button>
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
			<Grid is_flex padding="4px 16px">
				<Grid>
					<Button onClickButton={() => onClickButton("")}>홈</Button>
				</Grid>
				<Grid is_flex padding="4px 16px">
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
