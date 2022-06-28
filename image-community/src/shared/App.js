import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";
import Search from "./Search";
// import { ConnectedRouter } from "connected-react-router";
// import { history } from "../redux/configureStore";
// import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { apiKey } from "./firebase";
import Permit from "./Permit";
import SvgImage from "../elements/SvgImage";

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
	const isSession = sessionStorage.getItem(_sessionKey) ? true : false;

	useEffect(() => {
		if (isSession) {
			dispatch(userActions.logInCheckFB());
		}
	}, []);
	return (
		<React.Fragment>
			{/* <ConnectedRouter history={history}> */}
			{/* <BrowserRouter> */}
			<Header></Header>
			<Routes>
				<Route path="/" element={<PostList />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/post">
					{/* <Route path="" element={<PostList />} /> */}
					<Route path=":postId" element={<PostDetail />} />
				</Route>
				<Route path="/write">
					<Route path="" element={<PostWrite />} />
					<Route path=":postId" element={<PostWrite />} />
				</Route>
				<Route path="/noti" element={<Notification />} />
				<Route path="/search" element={<Search />} />
			</Routes>
			<Permit>
				<SvgImage onClickButton={() => navigate("/write")} />
			</Permit>
			{/* </BrowserRouter> */}
			{/* </ConnectedRouter> */}
		</React.Fragment>
	);
}

export default App;
