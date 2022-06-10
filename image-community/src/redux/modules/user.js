// import React from 'react'
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import Cookie from "../../shared/Cookie";

import { auth } from "../../shared/firebase";

// actions
// const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
// const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

const initialState = {
	user: null,
	isLogIn: false,
};

const userInitial = {
	userName: "ddd",
};

// middleware actions
const logInAction = (user) => {
	return function (dispatch, getState, { history }) {
		console.log(history);
		dispatch(setUser(user));
		// history.push('/'); navigate가 컴포넌트안에서만 사용가능하여 클릭함수에 넣어서 사용 중인데 문제없을지 의문
	};
};

const signupFB = (id, pwd, userName) => {
	return function (dispatch, setState, { history }) {
		auth
			.createUserWithEmailAndPassword(id, pwd)
			.then((user) => {
				console.log(user);
				auth.currentUser
					.updateProfile({
						displayName: userName,
					})
					.then(() => {
						dispatch(setUser({ id, userName, userProfile: "" }));
						// history.push('/');
					})
					.catch((error) => {
						console.log(error)
					});
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				// ..
				console.log(errorCode, errorMessage);
			});
	};
};

// reducer immer 사용(proxy 관련??)
export default handleActions(
	{
		[SET_USER]: (state, action) =>
			produce(state, (draft) => {
				Cookie.set("isLogIn", "success");
				draft.user = action.payload.user;
				draft.isLogIn = true;
			}),
		[LOG_OUT]: (state, action) =>
			produce(state, (draft) => {
				Cookie.del("isLogIn");
				draft.user = null;
				draft.isLogIn = false;
			}),
		[GET_USER]: (state, action) => produce(state, (draft) => {}),
	},
	initialState
);

// action creator export
const actionCreators = { logOut, getUser, logInAction, signupFB };

export { actionCreators };
