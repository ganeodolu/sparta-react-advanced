import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (postList) => ({ postList }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
	list: [], // 집합이 post 이므로 굳이 postList 쓰지 않음
};

const initialPost = {
	id: 0,
	userInfo: {
		userName: "mean0",
		userProfile:
			"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	},
	imageUrl:
		"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	contents: "괭이",
	commentCnt: 10,
	insertDt: "2022-06-02 18:00:00",
};

const getPostFB = () => {
	return function (dispatch, getState, { history }) {
		const postDB = firestore.collection("post");

		postDB.get().then((docs) => {
			const postList = [];
			docs.forEach((doc) => {
				const _post = doc.data();
				const post = Object.keys(_post).reduce(
					(acc, cur) => {
						if (cur.indexOf("user") !== -1) {
							return {
								...acc,
								userInfo: { ...acc.userInfo, [cur]: _post[cur] },
							};
						}
						return { ...acc, [cur]: _post[cur] };
					},
					{ id: doc.id, userInfo: {} }
				);

				console.log(post);
				postList.push(post);
			});
			console.log(postList);
			dispatch(setPost(postList));
		});
	};
};

export default handleActions(
	{
		[SET_POST]: (state, action) =>
			produce(state, (draft) => {
				draft.list = action.payload.postList;
			}),
		[ADD_POST]: (state, action) => produce(state, (draft) => {}),
	},
	initialState
);

const actionCreators = { setPost, addPost, getPostFB };

export { actionCreators };
