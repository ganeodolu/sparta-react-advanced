import React from 'react'
import { Grid, Image, Text, Button } from '../elements';

const Reply = (props) => {
  return (
		<div>
			<Grid is_flex>
				<Image></Image>
				<Text>nickname</Text>
				<Text>고양이군요</Text>
				<Button>삭제</Button>
			</Grid>
		</div>
	);
}

export default Reply
