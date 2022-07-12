import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const { _onClick, isFlex, width, margin, padding, bg, center, children } = props;

  const styles = {
    isFlex: isFlex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
  };

  return (
    <div>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </div>
  )
}

Grid.defaultProps = {
  onClick: () => {},
  children: null,
  isFlex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => props.padding? `padding: ${props.padding}` : ''};
  ${(props) => props.margin? `margin: ${props.margin}` : ''};
  ${(props) => props.bg ? `background-color: ${props.bg}` : ''};
  ${(props) => props.isFlex ? `display: flex; align-items: center; justify-content: space-between;` : ''};
  ${(props) => props.center ? 'text-align: center;' : ''};
  max-width: 640px;
  `

export default Grid
