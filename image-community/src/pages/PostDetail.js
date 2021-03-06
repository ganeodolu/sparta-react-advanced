import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Permit from "../shared/Permit";

const PostDetail = (props) => {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const userInfo = useSelector((state) => state.user.user);
	const postList = useSelector((state) => state.post.list);
	const postIdx = postList.findIndex(({ id }) => id === postId);
	const post = postList[postIdx];

	useEffect(() => {
		if (post) {
			return;
		}
		dispatch(postActions.getOnePostFB(postId));
	}, [])

	return (
		<>
			{post && ( // 새로고침시 오류 방지
				<Post {...post} isMe={post.userInfo.userId === userInfo?.uid}></Post>
			)}
			<Permit>
				<CommentWrite postId={postId} />
			</Permit>
			<CommentList postId={postId} />
		</>
	);
};

PostDetail.defaultProps = {
	user_info: {
		user_name: "mean0",
		user_profile:
			"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	},
	image_url:
		"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	contents: "괭이",
	comment_cnt: 10,
	insert_dt: "2022-06-02 18:00:00",
};

export default PostDetail;
