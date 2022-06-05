import React from "react";
import { Grid, Button } from "../elements";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const onClickButton = (str) => {
		navigate(`/${str}`);
	};

	return (
		<Grid is_flex padding="8px">
			<Button onClickButton={() => onClickButton("")}>홈</Button>
			<Button onClickButton={() => onClickButton("login")}>로그인</Button>
			<Button onClickButton={() => onClickButton("signup")}>회원가입</Button>
		</Grid>
	);
};

export default Header;
