import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Image, Text, Grid } from "../elements";
import { useNavigate } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import Upload from "../shared/Upload";
import { useParams } from "react-router-dom";

const PostWrite = () => {
	const { postId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogIn = useSelector(({ user }) => user.isLogIn);
	const preview = useSelector(({ image }) => image.preview);
	const postList = useSelector(({ post }) => post.list);
	const post = postList.filter((postItem) => postItem.id === postId)[0];

	const [state, setState] = useState({
		contents: post?.contents ? post.contents : "",
	});

	const onChangeInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const onClickButtonAdd = () => {
		dispatch(postActions.addPostFB(state.contents));
		navigate("/", { replace: true });
	};

	const onClickButtonUpdate = () => {
		dispatch(postActions.updatePostFB(postId, state.contents));
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

	if (postId) {

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
					<Image shape="rectangle" src={preview ?? post?.imageUrl} />
				</Grid>
				<Grid padding="16px">
					<Text size="20px">게시글 작성</Text>
					<Input
						name="contents"
						value={state.contents}
						onChange={onChangeInput}
						multiline
					></Input>
					<Button onClickButton={onClickButtonUpdate}>게시글 작성</Button>
				</Grid>
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
					name="contents"
					value={state.contents}
					onChange={onChangeInput}
					multiline
				></Input>
				<Button onClickButton={onClickButtonAdd}>게시글 작성</Button>
			</Grid>
		</Grid>
	);
};

export default PostWrite;
