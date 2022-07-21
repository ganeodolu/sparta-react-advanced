import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScrollIO from "../shared/InfinityScrollIO";

const PostList = (props) => {
  const navigate = useNavigate();
	const dispatch = useDispatch();
	const uid = useSelector((state) => state?.user?.user?.uid);
	const { list: postList, isLoading, paging } = useSelector(
		(state) => state.post
	);
  const onClickHandler = (text) => {
    navigate(`/post/${text}`)
  }

	useEffect(() => {
		if (postList.length < 2) {
			dispatch(postActions.getPostFB());
		}
	}, []);

	return (
		<React.Fragment>
			<Grid bg={"#EFF6FF"} padding="5px 0px">
			<InfinityScrollIO
				callNext={() => {
					dispatch(postActions.getPostFB(paging.next));
				}}
				isNext={paging.next ? true : false}
				loading={isLoading}
			>
				{postList.map((post) => {
					const { id: postId } = post;

					if (post.userInfo.userId === uid) {
						return (
							<Grid
								margin="8px 0px"
								bg={"#ffffff"}
								key={postId}
								_onClick={() => onClickHandler(postId)}
							>
								<Post {...post} isMe />
							</Grid>
						);
					} else {
						return (
							<Grid
								margin="8px 0px"
								bg={"#ffffff"}
								key={postId}
								_onClick={() => onClickHandler(postId)}
							>
								<Post {...post} />
							</Grid>
						);
					}
				})}
			</InfinityScrollIO>
			</Grid>
		</React.Fragment>
	);
};

export default PostList;
