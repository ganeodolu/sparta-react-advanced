import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Two = (props) => {
  const navigate = useNavigate();

	return (
		<div>
			<Helmet>
				<title>page two</title>
				<meta property="og:title" content="og page two" />
				<meta property="og:description" content="who's there?" />
				<meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
			</Helmet>
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
