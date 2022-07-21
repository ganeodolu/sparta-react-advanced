import React, { useEffect, useRef } from "react";
import { Spinner } from "../elements";

const defaultOption = {
	root: null,
	threshold: 0.5,
	rootMargin: "0px",
};

const InfinityScrollIO = (props) => {
	const { children, callNext, isNext, loading } = props;

	const spinnerRef = useRef(null);
	const io = new IntersectionObserver(([entry], observer) => {
		if (entry.isIntersecting) {
			observer.unobserve(spinnerRef.current);
			callNext();
		}
	}, defaultOption);


	useEffect(() => {
		if (loading) return;
		if (spinnerRef.current) {
			io.observe(spinnerRef.current)
		} 
		return () => io && io.disconnect();
	}, [loading])

	return (
		<div>
			{children}
			{isNext && <Spinner ref={spinnerRef} />}
		</div>
	);
};

InfinityScrollIO.defaultProps = {
	children: null,
	callNext: () => {},
	isNext: false,
	loading: false,
};

export default InfinityScrollIO;
