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
  isLogIn: false,
}

// middleware actions
const logInAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(logIn(user));
    // history.push('/');
  }
}

// reducer immer 사용(proxy 관련??)
export default handleActions(
	{
    [LOG_IN]: (state, action) => produce(state, (draft) => {
      Cookie.set("isLogIn", "success");
      draft.user = action.payload.user;
      draft.isLogIn = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      Cookie.del("isLogIn");
      draft.user = null;
      draft.isLogIn = false;
    }),
		[GET_USER]: (state, action) => produce(state, (draft) => {}),
	},
	initialState
);

// action creator export
const actionCreators = { logIn, logOut, getUser, logInAction }

export { actionCreators }