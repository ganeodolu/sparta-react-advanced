import React, { useEffect, useCallback } from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props) => {
	const { children, callNext, isNext, loading } = props;

	const _handleScroll = _.throttle(() => {
		if (loading) {
			return;
		}
		const { innerHeight } = window;
		const { scrollHeight } = document.body;
		const scrollTop =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		const DIFF_SCROLL = 200;
		if (scrollHeight - scrollTop - innerHeight < DIFF_SCROLL) {
			callNext();
		}
	}, 300);
	const handleScroll = useCallback(_handleScroll, [loading]);

	useEffect(() => {
		if (loading) return;
		if (isNext) {
			window.addEventListener("scroll", handleScroll);
		} else {
			window.removeEventListener("scroll", handleScroll);
		}

		return () => window.removeEventListener("scroll", handleScroll);
	}, [isNext, loading]);

  return (
		<div>
			{children}
			{isNext && <Spinner />}
		</div>
	);
};

InfinityScroll.defaultProps = {
	children: null,
	callNext: () => {},
	isNext: false,
	loading: false,
};

export default InfinityScroll;
