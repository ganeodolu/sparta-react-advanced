import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post'
import { actionCreators as postActions } from '../redux/modules/post';

const PostList = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state?.user?.user?.uid);
  const { list: postList, isLoading, paging } = useSelector((state) => state.post);

  useEffect(() => {
    if (postList.length === 0) {
    dispatch(postActions.getPostFB());
    }
  }, [])

  return (
    <React.Fragment>
      {postList.map((post) => {
        const { id } = post;
        return <Post key={id} uid={uid} {...post} />;
      })}
      <button onClick={() => {
        dispatch(postActions.getPostFB(paging.next));
      }}>추가로드</button>
    </React.Fragment>
  )
}

export default PostList
