import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase from "firebase/compat/app";
import { firestore, realtime } from "../../shared/firebase";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { actionCreators as postActions } from "./post";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (postId, commentList) => ({
	postId,
	commentList,
}));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
	postId,
	comment,
}));
const removeComment = createAction(REMOVE_COMMENT, (postId, commentId, commentList) => ({
	postId,
	commentId,
	commentList,
}))

const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
	list: {},
	isLoading: false,
};

const getCommentFB = (postId = null) => {
	return function (dispatch, getState) {
		if (!postId) return;
		const commnetDB = firestore.collection("comment");
		commnetDB
			.where("postId", "==", postId)
			.orderBy("insertDt", "desc")
			.get()
			.then((docs) => {
				let list = [];

				docs.forEach((doc) => {
					list.push({ ...doc.data(), id: doc.id });
				});
				dispatch(setComment(postId, list));
			})
			.catch((error) => {
				console.log("댓글 정보를 가져올수가 없습니다", error);
			});
	};
};

const addCommentFB = (postId, contents) => {
	return function (dispatch, getState) {
		const commentDB = firestore.collection("comment");
		const userInfo = getState().user.user;
		const { uid, userName, userProfile } = userInfo;
		let comment = {
			postId,
			userId: uid,
			userName: userName,
			userProfile: userProfile,
			contents,
			insertDt: dayjs().format("YYYY-MM-DD hh:mm:ss"),
		};

		commentDB.add(comment).then((doc) => {
			const postDB = firestore.collection("post");
			comment = { ...comment, id: doc.id };

			const post = getState().post.list.find((list) => list.id === postId);

			// firestore에 저장된 값을 +1해줍니다!
			const increment = firebase.firestore.FieldValue.increment(1);  // 숫자만큼 더해줌
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
						// 알림 리스트에 하나를 추가해줍니다!
						// post가 있어야 해서 dispatch 이후에 추가
						// 댓글 단 userId와 로그인 id를 비교해서 다를 때만 read: false해주는 것이 정석(강의해서는 안함)
						const _notiItem = realtime
							.ref(`noti/${post.userInfo.userId}/list`)
							.push();

						_notiItem.set(
							{
								postId: post.id,
								userName: comment.userName,
								imageUrl: post.imageUrl,
								insertDt: comment.insertDt,
							},
							(err) => {
								if (err) {
									console.log("알림 저장 실패");
								} else {
									// 알림이 가게 해줍니다!
									const notiDB = realtime.ref(`noti/${post.userInfo.userId}`);
									// 읽음 상태를 false로 바꿔주면 되겠죠!
									notiDB.update({ read: false });
								}
							}
						);
					}
				});
		});
	};
};

// db.collection("cities").doc("DC").delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });

const removeCommentFB = (postId, commentId, commentList) => {
	return function (dispatch, getState) {
		const commentDB = firestore.collection("comment");

		commentDB.doc(commentId).delete().then(() => {
			const postDB = firestore.collection("post");
			const post = getState().post.list.find((list) => list.id === postId);
			const increment = firebase.firestore.FieldValue.increment(-1);
			postDB
				.doc(postId)
				.update({ commentCnt: increment })
				.then((_post) => {
					dispatch(removeComment(postId, commentId, commentList))
					if (post) {
						dispatch(
							postActions.updatePost(postId, {
								commentCnt: parseInt(post.commentCnt) - 1,
							})
						);
				}
			})
		})
	}
} 

export default handleActions(
	{
		[SET_COMMENT]: (state, action) =>
			produce(state, (draft) => {
				draft.list[action.payload.postId] = action.payload.commentList;
			}),
		[ADD_COMMENT]: (state, action) =>
			produce(state, (draft) => {
				draft.list[action.payload.postId].unshift(action.payload.comment);
			}),
		[REMOVE_COMMENT]: (state, action) => 
			produce(state, (draft) => {
				const nextCommentList = action.payload.commentList.filter((comment) => comment.id !== action.payload.commentId);
				draft.list[action.payload.postId] = nextCommentList
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
	removeCommentFB,
};

export { actionCreators };
