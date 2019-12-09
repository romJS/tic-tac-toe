import React from "react";
import Square from "./Square";

const Board = props => {
  const renderBoard = squares => {
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

  return (
    <div className="board" style={{ border: "10px outset #929292" }}>
      {renderBoard(props.squares)}
    </div>
  );
};

export default Board;
