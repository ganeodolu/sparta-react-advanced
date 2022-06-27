import React from "react";
import { Grid, Text, Image } from "../elements";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
	const navigate = useNavigate();
	const { imageUrl, userName, postId } = props;

	return (
		<Grid
			padding="16px"
			is_flex
			bg="#ffffff"
			margin="8px 0px"
			_onClick={() => {
				navigate(`/post/${postId}`);
			}}
		>
			<Grid width="auto" margin="0px 8px 0px 0px">
				<Image src={imageUrl} size={85} shape="square" />
			</Grid>
			<Grid>
				<Text>
					<b>{userName}</b>님이 게시글에 댓글을 남겼습니다 :)!{" "}
				</Text>
			</Grid>
		</Grid>
	);
};

Card.defaultProps = {
	imageUrl: "http://via.placeholder.com/400x300",
};

export default Card;
