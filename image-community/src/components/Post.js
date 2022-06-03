import React from 'react'
import Grid from "../elements/Grid";
import Image from "../elements/Image";

const Post = (props) => {
  return (
		<div>
			<Grid>
				<Grid is_flex>
					<Image shape="circle" src={props.src}></Image>
				</Grid>
				<Grid padding="16px">

				</Grid>
				<Grid>
					<Image shape="rectangle" src={props.src} />
				</Grid>
				<Grid padding="16px">

				</Grid>
				<div>user profile/ user name / insert_dt</div>
				<div>contents</div>
				<div>image</div>
				<div>comment cnt</div>
			</Grid>
		</div>
	);
}

// 기본 props 지정해서 비어있을 때 오류 방지
Post.defaultProps = {
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

export default Post
