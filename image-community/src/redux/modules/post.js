import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { actionCreators as imageActions } from "./image";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (postList, paging) => ({
	postList,
	paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (post) => ({ post }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
	list: [], // 집합이 post 이므로 굳이 postList 쓰지 않음
	paging: { start: null, next: null, size: 3 },
	isLoading: false,
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
		};
		const _post = {
			...initialPost,
			contents,
			insertDt: dayjs().format("YYYY-MM-DD hh:mm:ss"),
		};
		const image = getState().image.preview;
		const upload = storage
			.ref(`images/${userInfo.userId}_${new Date().getTime()}`)
			.putString(image, "data_url");
		upload.then((snapshot) => {
			snapshot.ref
				.getDownloadURL()
				.then((url) => {
					dispatch(imageActions.uploadImage(url));
					return url;
				})
				.then((url) => {
					postDB
						.add({ ...userInfo, ..._post, imageUrl: url })
						.then((doc) => {
							let post = { userInfo, ..._post, id: doc.id, imageUrl: url };
							dispatch(addPost(post));
							dispatch(imageActions.setPreview(null)); // 업로드 후 미리보기 초기화
						})
						.catch((error) => {
							alert("post 작성 실패");
							console.log("post 작성에 실패했어요", error);
						});
				})
				.catch((error) => {
					alert("이미지 업로드 실패");
					console.log("이미지 업로드에 실패했습니다", error); // 실제 서비스에서는 도움되는 동작을 추가
				});
		});
	};
};

const updatePostFB = (postId, contents = "") => {
	return function (dispatch, getState, { history }) {
		const postDB = firestore.collection("post").doc(postId);
		const user = getState().user.user;
		const userInfo = {
			userName: user.userName,
			userId: user.uid,
			userProfile: user.userProfile,
		};
		const post = {
			...initialPost,
			contents,
			insertDt: dayjs().format("YYYY-MM-DD hh:mm:ss"),
		};
		const image = getState().image.preview;
		const upload = storage
			.ref(`images/${userInfo.userId}_${new Date().getTime()}`)
			.putString(image, "data_url");
		upload.then((snapshot) => {
			snapshot.ref
				.getDownloadURL()
				.then((url) => {
					dispatch(imageActions.uploadImage(url));
					return url;
				})
				.then((url) => {
					return postDB
						.update({ ...post, imageUrl: url })
						.then((doc) => {
							let newPost = { userInfo, ...post, id: doc.id, imageUrl: url };
							dispatch(updatePost(newPost));
							dispatch(imageActions.setPreview(null)); // 업로드 후 미리보기 초기화
						})
						.catch((error) => {
							alert("post 수정 실패");
							console.log("post 수정에 실패했어요", error);
						});
				})
				.catch((error) => {
					alert("이미지 업로드 실패");
					console.log("이미지 업로드에 실패했습니다", error); // 실제 서비스에서는 도움되는 동작을 추가
				});
		});
	};
};

const getPostFB = (start = null, size = 3) => {
	return function (dispatch, getState, { history }) {
		let _paging = getState().post.paging;
		if (_paging.start && !_paging.next) {
			return;
		}
		dispatch(loading(true));
		const postDB = firestore.collection("post");
		let query = postDB.orderBy("insertDt", "desc");
		if (start) {
			query = query.startAt(start);
		}

		query
			.limit(size + 1)
			.get()
			.then((docs) => {
				const postList = [];
				let paging = {
					start: docs.docs[0],
					next:
						docs.docs.length === size + 1
							? docs.docs[docs.docs.length - 1]
							: null,
					size,
				};
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
				postList.pop();
				dispatch(setPost(postList, paging));
			});
	};
};

const getOnePostFB = (postId) => {
	return function (dispatch, getState, { history }) {
		const postDB = firestore.collection("post");
		postDB
			.doc(postId)
			.get()
			.then((doc) => {
				const _post = doc.data();
				if (!_post) {
					return;
				}
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
				dispatch(setPost([post])); // 한개의 post 넣어줌
			});
	};
};

export default handleActions(
	{
		[SET_POST]: (state, action) =>
			produce(state, (draft) => {
				draft.list.push(...action.payload.postList);
				draft.list = draft.list.reduce((acc, cur) => {
					if (acc.findIndex((a) => a.id === cur.id) === -1) {
						// reduce 사용 중복제거
						return [...acc, cur];
					} else {
						acc[acc.findIndex((a) => a.id === cur.id)] = cur;
						return acc;
					}
				}, []);

				if (action.payload.paging) {
					draft.paging = action.payload.paging;
				}
				draft.isLoading = false;
			}),
		[ADD_POST]: (state, action) =>
			produce(state, (draft) => {
				draft.list.unshift(action.payload.post);
			}),
		[UPDATE_POST]: (state, action) =>
			produce(state, (draft) => {
				draft.list = action.payload.postList;
			}),
		[LOADING]: (state, action) =>
			produce(state, (draft) => {
				draft.isLoading = action.payload.isLoading;
			}),
	},
	initialState
);

const actionCreators = {
	setPost,
	addPost,
	getPostFB,
	addPostFB,
	updatePostFB,
	getOnePostFB,
};

export { actionCreators };
