import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Image, Text, TextArea, Grid } from "../elements";
import { useNavigate } from "react-router-dom";

const PostWrite = () => {
	const navigate = useNavigate();
	const isLogIn = useSelector(({user}) => user.isLogIn);
	const [state, setState] = useState({
		contents: "",
	})
	const [previewImage, setPreviewImage] = useState(
		"https://cdn-icons-png.flaticon.com/512/2456/2456987.png"
	);

		const onChangeInput = (e) => {
			setState({
				...state,
				[e.target.name]: e.target.value,
			});
	};
	
	const readURL = (e) => {
		if (!e.target.files) return;

		const imgFile = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(imgFile);
		reader.onloadend = () => {
			const imgBase64 = typeof reader.result === "string" ? reader.result : "";
			setPreviewImage(imgBase64);
		};
	};

	if (!isLogIn) {
		return (
			<Grid margin="100px 0px" padding="16px" center>
				<Text size="32px" bold>잠시만요!</Text>
				<Text size="16px">로그인하고 가실께요</Text>
				<Button
					width="40vw"
					onClickButton={() => {
						navigate("/", {
							replace: true,
						});
					}}
				>
					로그인페이지 가기
				</Button>
			</Grid>
		);
	}

	return (
		<Grid>
			<Text size="32px">게시글 작성</Text>
			<Input type="file" name="upload" onChange={readURL}></Input>
			<Text size="20px">미리보기</Text>
			<Image id="preview" shape="rectangle" src={previewImage} />
			<Text size="20px">게시글 작성</Text>
			<Input value={state.contents} onChange={onChangeInput} multiline></Input>
			{/* <TextArea placeholder="게시글 내용"></TextArea> */}
			<Button>게시글 작성</Button>
		</Grid>
	);
};

export default PostWrite;
