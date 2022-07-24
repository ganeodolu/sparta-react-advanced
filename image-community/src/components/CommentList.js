import React, { useEffect } from "react";
import { Grid, Image, Text, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const commentList = useSelector(state => state.comment.list);
  const { postId } = props;

  useEffect(() => {
    if (!commentList[postId]) { // 리덕스에 해당댓글 없으면(새로고침 등) firebase에서 댓글 가져옴
      dispatch(commentActions.getCommentFB(postId));
    }
  }, [])

  if (!commentList[postId] || !postId) {
    return null
  }
		return (
			<React.Fragment>
				<Grid padding="16px">
					{commentList[postId].map((comment) => {
						return <CommentItem key={comment.id} {...comment} />;
					})}
				</Grid>
			</React.Fragment>
		);
};

CommentList.defaultProps = {
  postId: null,
}

export default CommentList;


const CommentItem = (props) => {
  const dispatch = useDispatch();
	const uid = useSelector((state) => state?.user?.user?.uid);
  const { id: commentId, userProfile, userName, userId, postId, contents, insertDt } = props;
  const onClickButton = () => {
    dispatch(commentActions.removeCommentFB(postId, commentId))
  }

    return (
        <Grid isFlex>
            <Grid isFlex width="auto">
                <Image shape="circle"/>
                <Text bold>{userName}</Text>
            </Grid>
            <Grid isFlex margin="0px 4px">
                <Text margin="0px">{contents}</Text>
                <Text margin="0px">{insertDt}</Text>
          </Grid>
          {uid === userId && <Button width="10%" onClickButton={() => onClickButton()}>삭제</Button>}
        </Grid>
    )
}

CommentItem.defaultProps = {
    userProfile: "",
    userName: "mean0",
    userId: "",
    postId: 1,
    contents: "귀여운 고양이네요!",
    insertDt: '2021-01-01 19:00:00'
}
