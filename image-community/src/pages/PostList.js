import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post'
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';

const PostList = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state?.user?.user?.uid);
  const { list: postList, isLoading, paging } = useSelector((state) => state.post);
  console.log(paging)

  useEffect(() => {
    if (postList.length === 0) {
    dispatch(postActions.getPostFB());
    }
  }, [])

  return (
		<React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next))
        }}
        isNext={paging.next? true: false}
        loading={isLoading}
      >
				{postList.map((post) => {
					const { id } = post;
					return <Post key={id} uid={uid} {...post} />;
				})}
			</InfinityScroll>
		</React.Fragment>
	);
}

export default PostList
