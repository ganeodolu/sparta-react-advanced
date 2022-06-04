import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path="/" element={<PostList />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
