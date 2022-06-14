import React, { useState } from "react";
import { Input, Button, Image, Text, TextArea } from "../elements";

const PostWrite = () => {
  const [previewImage, setPreviewImage] = useState(
		"https://cdn-icons-png.flaticon.com/512/2456/2456987.png"
	);
	const readURL = (e) => {
		if (!e.target.files) return;

		const imgFile = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(imgFile);
		reader.onloadend = () => {
			const imgBase64 = typeof reader.result === "string" ? reader.result : "";
      setPreviewImage(imgBase64);
		};
	};

	return (
		<div>
			<Text size="32px">게시글 작성</Text>
			<Input type="file" name="upload" onChange={readURL}></Input>
			<Text size="20px">미리보기</Text>
			<Image
				id="preview"
				shape="rectangle"
				src={previewImage}
			/>
			<Text size="20px">게시글 작성</Text>
			<TextArea placeholder="게시글 내용"></TextArea>
			<Button width="90vw">게시글 작성</Button>
		</div>
	);
};

export default PostWrite;
