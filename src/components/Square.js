import React from "react";
import styled from "styled-components";
import { GameContext } from "./Game";

const Button = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 50px;
  width: 50px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
`;

const Square = React.memo(props => {
  console.log("render square");
  let renderedValue = "";

  if (props.value === 1) {
    renderedValue = <span style={{ color: "teal" }}>X</span>;
  } else if (props.value === 2) {
    renderedValue = <span style={{ color: "palevioletred" }}>O</span>;
  } else {
    renderedValue = "";
  }

  return (
    <GameContext.Consumer>
      {({ handleClick }) => (
        <Button onClick={e => handleClick(e, props.axisX, props.axisY)}>
          {renderedValue}
        </Button>
      )}
    </GameContext.Consumer>
  );
});

export default Square;
