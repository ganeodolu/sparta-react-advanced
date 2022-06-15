import React from "react";
import { Button, Grid, Image, Text } from "../elements";

const Reply = (props) => {
	return (
		<div>
			<Grid isFlex>
				<Image></Image>
				<Text>nickname</Text>
				<Text>고양이군요</Text>
				<Button>삭제</Button>
			</Grid>
		</div>
	);
};

export default Reply;
