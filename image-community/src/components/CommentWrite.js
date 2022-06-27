import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Input, Button } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
	const dispatch = useDispatch();
	const { postId } = props;
	const [commentText, setCommentText] = useState("");

	const onChange = (e) => {
		setCommentText(e.target.value);
	};

	const write = () => {
		if (commentText === "") {
			window.alert("댓글을 입력해주세요!");
			return;
		}
		dispatch(commentActions.addCommentFB(postId, commentText));
		setCommentText("");
	};

	return (
		<React.Fragment>
			<Grid padding="16px" isFlex>
				<Input
					placeholderText="댓글 내용을"
					onChange={onChange}
					value={commentText}
					onSubmit={write}
				/>
				<Button width="50px" margin="0px 2px 0px 2px" onClickButton={write}>
					작성
				</Button>
			</Grid>
		</React.Fragment>
	);
};

export default CommentWrite;
