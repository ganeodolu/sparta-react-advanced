import React from "react";
import { useNavigate } from "react-router-dom";
const One = (props) => {
  const navigate = useNavigate();

	return (
		<div>
			<h2>Hi, there :) ! page one</h2>
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

export default One;
