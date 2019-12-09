import React from "react";
import Board from "./Board";
import PopUpWindow from "./PopUpWindow";
import styled from "styled-components";

const GameContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const GameContext = React.createContext({
  handleClick: () => {},
  xIsNext: true
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [...Array.from({ length: 10 }).map(() => Array(10).fill(null))],
      xIsNext: true,
      lastMove: [],
      movesCount: 0,
      player: "",
      handleClick: this.handleClick
    };
    this.boardRef = React.createRef();
  }

  componentDidUpdate() {
    this.calculateWinner(this.state.squares);
  }

  handleClick = (event, x, y) => {
    const squares = [...this.state.squares];

    if (this.calculateWinner(squares) || squares[x][y]) return;
    squares[x][y] = this.state.xIsNext ? "X" : "O";

    event.target.classList.add(this.state.xIsNext ? "teal" : "palevioletred");

    const coordinates = [...[Number(x), Number(y)]];

    this.setState(state => ({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      lastMove: coordinates,
      player: this.state.xIsNext ? "X" : "O",
      movesCount: state.movesCount + 1
    }));
  };

  resetGame = () => {
    const emptySquares = [
      ...Array.from({ length: 10 }).map(() => Array(10).fill(null))
    ];
    const boardElement = this.boardRef.current;
    // Removes a class from each square
    Array.from(boardElement.children).forEach(item => {
      Array.from(item.children).forEach(item => {
        item.classList.remove("teal");
        item.classList.remove("palevioletred");
      });
    });

    this.setState({
      squares: emptySquares,
      xIsNext: true,
      lastMove: [],
      movesCount: 0,
      player: ""
    });
  };

  calculateWinner = squares => {
    let coordinates = this.state.lastMove;
    let col = 0;
    let row = 0;
    let diagonal1 = 0;
    let diagonal2 = 0;
    //// UP ---> DOWN ////
    for (let i = coordinates[1]; i < 10; i++) {
      if (squares[coordinates[0]][i] === this.state.player) {
        col++;
      } else {
        break;
      }
    }
    //// DOWN ---> UP ////
    for (let i = coordinates[1] - 1; i >= 0; i--) {
      if (squares[coordinates[0]][i] === this.state.player) {
        col++;
      } else {
        break;
      }
    }
    //// RIGHT ---> LEFT ////
    for (let i = coordinates[0]; i < 10; i++) {
      if (squares[i][coordinates[1]] === this.state.player) {
        row++;
      } else {
        break;
      }
    }
    //// LEFT ---> RIGHT ////
    for (let i = coordinates[0] - 1; i >= 0; i--) {
      if (squares[i][coordinates[1]] === this.state.player) {
        row++;
      } else {
        break;
      }
    }
    //// DOWN-RIGHT ---> UP-LEFT///
    let x = coordinates[0];
    let y = coordinates[1];
    while (x >= 0 && y >= 0) {
      if (squares[x][y] === this.state.player) {
        diagonal1++;
      } else {
        break;
      }
      x--;
      y--;
    }
    //// UP-LEFT ---> DOWN-RIGHT///
    x = coordinates[0] + 1;
    y = coordinates[1] + 1;
    while (x < 10 && y < 10) {
      if (squares[x][y] === this.state.player) {
        diagonal1++;
      } else {
        break;
      }
      x++;
      y++;
    }
    //// DOWN-LEFT ---> UP-RIGHT
    x = coordinates[0];
    y = coordinates[1];
    while (x >= 0 && y < 10) {
      if (squares[x][y] === this.state.player) {
        diagonal2++;
      } else {
        break;
      }
      x--;
      y++;
    }
    //// UP-RIGHT ---> DOWN-LEFT
    x = coordinates[0] + 1;
    y = coordinates[1] - 1;
    while (x < 10 && y >= 0) {
      if (squares[x][y] === this.state.player) {
        diagonal2++;
      } else {
        break;
      }
      x++;
      y--;
    }

    if (col === 4 || row === 4 || diagonal1 === 4 || diagonal2 === 4) {
      //console.log(this.state.lastMove);
      //console.log("col: " + col);
      //console.log("row: " + row);
      //console.log("diag1: " + diagonal1);
      //console.log("diag2: " + diagonal2);
      //console.log(this.state.player);
      return this.state.player;
    }
    return null;
  };

  render() {
    let status;
    let winStatus;
    const winner = this.calculateWinner(this.state.squares);

    winner
      ? (status = "Winner is " + winner)
      : (status = "Next player: " + (this.state.xIsNext ? "X" : "O"));
    if (this.state.movesCount === 100) status = "Draw!!!";
    if (winner) {
      winStatus = (
        <PopUpWindow
          status={status}
          resetGame={this.resetGame}
          xIsNext={this.state.xIsNext}
        />
      );
    }

    return (
      <GameContainer>
        <GameContext.Provider value={this.state}>
          <h1>TIC TAC TOE</h1>
          <div className="board-status">{status}</div>
          <Board squares={this.state.squares} boardRef={this.boardRef} />
          {winStatus}
        </GameContext.Provider>
      </GameContainer>
    );
  }
}

export default Game;
