import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Image, Text, TextArea, Grid } from "../elements";
import { useNavigate } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import Upload from "../shared/Upload";

const PostWrite = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogIn = useSelector(({ user }) => user.isLogIn);
	const preview = useSelector(({ image }) => image.preview);
	const [state, setState] = useState({
		contents: "",
	});

	const onChangeInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const onClickButton = () => {
		dispatch(postActions.addPostFB(state.contents));
		navigate("/", { replace: true });
	};

	if (!isLogIn) {
		return (
			<Grid margin="100px 0px" padding="16px" center>
				<Text size="32px" bold>
					잠시만요!
				</Text>
				<Text size="16px">로그인하고 가실께요</Text>
				<Button
					width="40vw"
					onClickButton={() => {
						navigate("/", { replace: true });
					}}
				>
					로그인페이지 가기
				</Button>
			</Grid>
		);
	}

	return (
		<Grid>
			<Grid padding="16px">
				<Text size="36px" margin="0px">
					게시글 작성
				</Text>
				<Upload></Upload>
			</Grid>
			<Grid>
				<Grid>
					<Text margin="0px" size="24px">
						미리보기
					</Text>
				</Grid>
				<Image
					shape="rectangle"
					src={
						preview ?? "https://cdn-icons-png.flaticon.com/512/2456/2456987.png"
					}
				/>
			</Grid>
			<Grid padding="16px">
				<Text size="20px">게시글 작성</Text>
				<Input
					value={state.contents}
					onChange={onChangeInput}
					multiline
				></Input>
				<Button onClickButton={onClickButton}>게시글 작성</Button>
			</Grid>
		</Grid>
	);
};

export default PostWrite;
