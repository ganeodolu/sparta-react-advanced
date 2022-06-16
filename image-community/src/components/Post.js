import React from "react";
import { Grid, Image, Text } from "../elements";

const Post = (props) => {
	return (
		<div>
			<Grid>
				<Grid isFlex>
					<Image shape="circle" src={props.src}></Image>
					<Text bold>{props.userInfo.userName}</Text>
					<Text>{props.insertDt}</Text>
				</Grid>
				<Grid padding="16px">
					<Text>{props.contents}</Text>
				</Grid>
				<Grid>
					<Image shape="rectangle" src={props.src} />
				</Grid>
				<Grid padding="16px">
					<Text>댓글 {props.commentCnt}개</Text>
				</Grid>
			</Grid>
		</div>
	);
};

// 기본 props 지정해서 비어있을 때 오류 방지
Post.defaultProps = {
	userInfo: {
		userName: "mean0",
		userProfile:
			"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	},
	imageUrl:
		"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	contents: "괭이",
	commentCnt: 10,
	insertDt: "2022-06-02 18:00:00",
};

export default Post;
