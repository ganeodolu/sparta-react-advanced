import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Image, Text, Button } from "../elements";

const Post = memo((props) => {
	const {
		id,
		src,
		insertDt,
		contents,
		imageUrl,
		userInfo,
		commentCnt,
		isMe,
	} = props;
	const navigate = useNavigate();

	const onClickButton = (e) => {
		e.stopPropagation();
		navigate(`/write/${id}`);
	}

	return (
		<div>
			<Grid>
				<Grid isFlex>
					<Image shape="circle" src={src}></Image>
					<Text bold>{userInfo.userName}</Text>
					<Text>{insertDt}</Text>
					{isMe && <Button width="15%" onClickButton={e => onClickButton(e)}>수정</Button>}
				</Grid>
				<Grid padding="16px">
					<Text>{contents}</Text>
				</Grid>
				<Grid>
					<Image shape="rectangle" src={imageUrl} />
				</Grid>
				<Grid padding="16px">
					<Text>댓글 {commentCnt}개</Text>
				</Grid>
			</Grid>
		</div>
	);
});

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
