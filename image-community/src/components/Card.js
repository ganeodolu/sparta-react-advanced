import React from 'react'
import { Grid, Image, Text } from '../elements'

const Card = (props) => {
	const { text } = props;
  return (
		<Grid padding="10px">
			<Grid isFlex margin="10px">
				<Image shape="default" size={80}></Image>
				<Text>{text}님이 게시글에 댓글을 남겼습니다</Text>
			</Grid>
		</Grid>
	);
}

export default Card
