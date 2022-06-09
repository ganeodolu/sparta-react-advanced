// import React from 'react'
import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import Cookie from "../../shared/Cookie";
// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

const initialState = {
  user: null,
  isLogin: false,
}
// reducer immer 사용(proxy 관련??)
export default handleActions(
	{
    [LOG_IN]: (state, action) => produce(state, (draft) => {
      Cookie.set("isLogin", "success");
      draft.user = action.payload.user;
      draft.isLogin = true;
    }),
		[LOG_OUT]: (state, action) => produce(state, (draft) => {}),
		[GET_USER]: (state, action) => produce(state, (draft) => {}),
	},
	initialState
);

// action creator export
const actionCreator = { logIn, logOut, getUser }

export { actionCreator }