import React, { useState, useEffect } from "react";
import { Grid, Button } from "../elements";
import { useNavigate } from "react-router-dom";
import Cookie from "./Cookie";

const Header = () => {
	const [isLogin, setIsLogin] = useState(false);
	

	const navigate = useNavigate();
	const onClickButton = (str) => {
		navigate(`/${str}`);
	};
	const onClickLogoutButton = (name) => Cookie.del(name);

	useEffect(() => {
		let cookie = Cookie.get("userId");
		console.log(cookie)

		if (cookie) {
			setIsLogin(true)
		} else {
			setIsLogin(false)
		}
	})

	if (isLogin) {
			return (
				<>
					<Grid is_flex padding="4px 16px">
						<Grid>
							<Button onClickButton={() => onClickButton("")}>홈</Button>
						</Grid>
						<Grid is_flex padding="4px 16px">
							<Button onClickButton={() => onClickButton("")}>내 정보</Button>
							<Button onClickButton={() => onClickButton("login")}>알림</Button>
							<Button onClickButton={() => onClickLogoutButton("userId")}>
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
