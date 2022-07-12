import React from "react";
import styled from "styled-components";
import { ReactComponent as WriteButton } from "../assets/writeButton.svg";

const SvgImage = (props) => {
	const { onClickButton } = props;
	return (
		<SvgWrapper>
			<WriteButton onClick={onClickButton}/>
		</SvgWrapper>
	);
};

const SvgWrapper = styled.div`
	position: fixed;
	bottom: 10vh;
	right: 10vw;
`;

export default SvgImage;
