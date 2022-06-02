import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import PostList from '../pages/PostList';

function App() {
  return (
		<React.Fragment>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PostList />} />
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;
