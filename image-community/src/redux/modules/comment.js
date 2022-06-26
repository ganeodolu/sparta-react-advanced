import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase from "firebase/compat/app";
import { firestore } from "../../shared/firebase";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { actionCreators as postActions } from "./post";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (postId, commentList) => ({
	postId,
	commentList,
}));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
	postId,
	comment,
}));

const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
	list: {},
	isLoading: false,
};

const getCommentFB = (postId = null) => {
  return function (dispatch, getState, { history }) {
    if(!postId) return
    const commnetDB = firestore.collection("comment");
    commnetDB.where("postId", "==", postId).orderBy("insertDt", "desc").get().then((docs) => {
      let list = [];

      docs.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      })
      dispatch(setComment(postId, list));
    }).catch(error => {
      console.log("댓글 정보를 가져올수가 없습니다", error);
    })
  };
};

const addCommentFB = (postId, contents) => {
	return function (dispatch, getState, { history }) {
		const commentDB = firestore.collection("comment");
		const userInfo = getState().user.user;

		let comment = {
			postId: postId,
			user_id: userInfo.uid,
			userName: userInfo.userName,
			userProfile: userInfo.userProfile,
			contents: contents,
			insert_dt: dayjs().format("YYYY-MM-DD hh:mm:ss"),
		};

		commentDB.add(comment).then((doc) => {
			const postDB = firestore.collection("post");
			comment = { ...comment, id: doc.id };

			const post = getState().post.list.find((list) => list.id === postId);

			//   firestore에 저장된 값을 +1해줍니다!
			const increment = firebase.firestore.FieldValue.increment(1);

			// post에도 commentCnt를 하나 플러스 해줍니다.
			postDB
				.doc(postId)
				.update({ commentCnt: increment })
				.then((_post) => {
					dispatch(addComment(postId, comment));
					// 리덕스에 post가 있을 때만 post의 commentCnt를 +1해줍니다.
					if (post) {
						dispatch(
							postActions.updatePost(postId, {
								commentCnt: parseInt(post.commentCnt) + 1,
							})
						);
					}
				});
		});
	};
};

export default handleActions(
	{
		[SET_COMMENT]: (state, action) =>
			produce(state, (draft) => {
				draft.list[action.payload.postId] = action.payload.commentList;
			}),
		[ADD_COMMENT]: (state, action) =>
			produce(state, (draft) => {
				draft.list[action.payload.postId].push(action.payload.comment);
			}),
		[LOADING]: (state, action) =>
			produce(state, (draft) => {
				draft.isLoading = action.payload.isLoading;
			}),
	},
	initialState
);

const actionCreators = {
	setComment,
	addComment,
	getCommentFB,
	addCommentFB,
};

export { actionCreators };
