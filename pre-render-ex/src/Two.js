import React from "react";
import { useNavigate } from "react-router-dom";

const Two = (props) => {
  const navigate = useNavigate();

	return (
		<div>
			<h2>Hi, there :) ! page two</h2>
			<button
				onClick={() => {
					navigate("/");
				}}
			>
				page one
			</button>
			<button
				onClick={() => {
					navigate("/two");
				}}
			>
				page two
			</button>
		</div>
	);
};

export default Two;
