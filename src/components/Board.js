import React from "react";
import Square from "./Square";
import styled from "styled-components";

const BoardDiv = styled.div`
  border: 10px outset #929292;
`;

class Board extends React.Component {
  renderBoard = squares => {
    return Array.from({ length: 10 }).map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {Array.from({ length: 10 }).map((item, squareIndex) => (
          <Square
            key={squareIndex}
            axisX={squareIndex}
            axisY={rowIndex}
            value={squares[squareIndex][rowIndex]}
          />
        ))}
      </div>
    ));
  };

  render() {
    return (
      <BoardDiv className="board" ref={this.props.boardRef}>
        {this.renderBoard(this.props.squares)}
      </BoardDiv>
    );
  }
}

export default Board;
