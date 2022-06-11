import "./App.css";
import { Route, Routes } from "react-router-dom";

import React, { useEffect } from "react";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
// import { ConnectedRouter } from "connected-react-router";
// import { history } from "../redux/configureStore";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from "react-redux";
import { apiKey } from './firebase';

function App() {
	const dispatch = useDispatch();
	const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
	const isSession = sessionStorage.getItem(_sessionKey) ? true : false; 

	useEffect(() => {
		if (isSession) {
			dispatch(userActions.logInCheckFB());
		}
	}, [])
	return (
		<React.Fragment>
			{/* <ConnectedRouter history={history}> */}
			<BrowserRouter>
				<Header></Header>
				<Routes>
					<Route path="/" element={<PostList />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
			{/* </ConnectedRouter> */}
		</React.Fragment>
	);
}

export default App;
