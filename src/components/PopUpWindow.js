import React from "react";
import styled from "styled-components";

const PopUp = styled.div`
  display: flex;
  color: ${props => (props.xIsNext ? "palevioletred" : "teal")}
  flex-direction: column;
  position: absolute;
  background: #ccc;
  width: 15rem;
  height: 10rem;
  justify-content: center;
  align-items: center;
`;

const ResetBtn = styled.button`
  background: #929292;
  margin-top: 10px;
  border: 2px solid;
  color: white;
  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const PopUpWindow = props => {
  return (
    <PopUp xIsNext={props.xIsNext}>
      {props.status}
      <ResetBtn className="reset-btn" onClick={props.resetGame}>
        PLAY AGAIN
      </ResetBtn>
    </PopUp>
  );
};

export default PopUpWindow;
