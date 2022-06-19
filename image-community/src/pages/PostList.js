import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post'
import { actionCreators as postActions } from '../redux/modules/post';

const PostList = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  const uid = useSelector((state) => state?.user?.user?.uid);

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
    </React.Fragment>
  )
}

export default PostList
