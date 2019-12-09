import React from "react";
import styled from "styled-components";
import SaveLocalStateHOC from "./SaveLocalStateHOC";

const Button = styled.button`
  background: #fff;
  color: palevioletred;
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
  &.teal {
    color: teal;
  }
`;

const Square = React.memo(props => {
  return (
    <Button className="" onClick={props.onClick}>
      {props.value}
    </Button>
  );
});

export default SaveLocalStateHOC(Square);
