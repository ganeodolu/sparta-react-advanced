// import React from 'react'
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import Cookie from "../../shared/Cookie";

import firebase from "firebase/compat/app";
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
const logInFB = (id, pwd) => {
	return function (dispatch, getState, { history }) {
		auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
			auth
				.signInWithEmailAndPassword(id, pwd)
				.then((user) => {
					console.log(user); // auth.currentUser

					dispatch(
						setUser({
							id,
							userName: user.user.displayName,
							userProfile: "",
							uid: user.user.uid,
						})
					);
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode, errorMessage);
				});
		});
	};
};

const signUpFB = (id, pwd, userName) => {
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
						dispatch(setUser({
							id,
							userName,
							userProfile: "",
							uid: user.user.uid,
						}));
						// history.push('/');
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
};

const logInCheckFB = () => {
	return function (dispatch, getState, { history }) {
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user)
				dispatch(
					setUser({
						id : user.email,
						userName: user.displayName,
						userProfile: "",
						uid: user.uid,
					})
				);
			} else {
				dispatch(logOut());
			}
		})
	}
}

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
const actionCreators = { logOut, getUser, logInFB, signUpFB, logInCheckFB };

export { actionCreators };
