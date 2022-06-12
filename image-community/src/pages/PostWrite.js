import React from 'react'
import { Input, Button, Image, Text, TextArea } from "../elements";

const PostWrite = () => {
  const readURL = (e) => {
    console.log(e)
    console.log(e.target)
    const input = e.target
    if (input && input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById("preview").src =
				"https://cdn-icons-png.flaticon.com/512/2456/2456987.png";
    }
  }

  return (
		<div>
			<Text size="32px">게시글 작성</Text>
			<input type="file" name="upload" onChange={(e) => readURL(e)}></input>
			<Text size="20px">미리보기</Text>
			<Image
				id="preview"
				shape="rectangle"
				// size="50"
				src="https://cdn-icons-png.flaticon.com/512/2456/2456987.png"
			/>
			<Text size="20px">게시글 작성</Text>
      <TextArea placeholder="게시글 내용"></TextArea>
      <Button width="90vw">게시글 작성</Button>
		</div>
	);
}

export default PostWrite
