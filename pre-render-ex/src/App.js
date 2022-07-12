import logo from "./logo.svg";
import "./App.css";

import One from "./One";
import Two from "./Two";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			pre render test!
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<One />} />
					<Route path="/two" element={<Two />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
