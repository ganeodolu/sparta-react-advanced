import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (postList) => ({ postList }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
	list: [], // 집합이 post 이므로 굳이 postList 쓰지 않음
};

const initialPost = {
	// id: 0,
	// userInfo: {
	// 	userName: "mean0",
	// 	userProfile:
	// 		"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	// },
	imageUrl:
		"http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg",
	contents: "",
	commentCnt: 0,
	insertDt: dayjs().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents = "") => {
	return function (dispatch, getState, { history }) {
		const postDB = firestore.collection("post");
		const user = getState().user.user;
		const userInfo = {
			userName: user.userName,
			userId: user.uid,
			userProfile: user.userProfile,
		}
		const post = {
			...initialPost,
			contents,
			insertDt: dayjs().format("YYYY-MM-DD hh:mm:ss"),
		};

		postDB.add({ ...userInfo, ...post }).then((doc) => {
			let newPost = { userInfo, ...post, id: doc.id };
			dispatch(addPost(newPost));
		}).catch((error) => {
			console.log("post 작성에 실패했어요", error)
		})
	}
}

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
		[ADD_POST]: (state, action) => produce(state, (draft) => {
			draft.list.unshift(action.payload.post);
		}),
	},
	initialState
);

const actionCreators = { setPost, addPost, getPostFB, addPostFB };

export { actionCreators };
