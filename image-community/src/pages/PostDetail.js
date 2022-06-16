import React from "react";
import Reply from "../components/Reply";
import { Button, Grid, Image, Text, Input } from "../elements";

const PostDetail = (props) => {
	return (
		<div>
			<Grid>
				<Grid isFlex>
					<Image shape="circle" src={props.src}></Image>
					<Text bold>{props.user_info.user_name}</Text>
					<Text>{props.insert_dt}</Text>
				</Grid>
				<Grid padding="16px">
					<Text>{props.contents}</Text>
				</Grid>
				<Grid>
					<Image shape="rectangle" src={props.src} />
				</Grid>
				<Grid padding="16px">
					<Text>댓글 {props.comment_cnt}개</Text>
				</Grid>
				<Grid isFlex>
					{/* <TextArea cols="50" rows="3">
						댓글 내용을 입력해주세요
					</TextArea> */}
					<Input
						// value={state.contents}
						// onChange={onChangeInput}
						multiline
					>댓글 내용을 입력해주세요</Input>

					<Button>작성</Button>
				</Grid>
				<Reply></Reply>
				<Reply></Reply>
				<Reply></Reply>
			</Grid>
		</div>
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
