import React from "react";
import Board from "./Board";
import PopUpWindow from "./PopUpWindow";
import styled from "styled-components";
import { calculateWinner } from "./utils";
import { cloneDeep } from "lodash";

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
    this.playSize = 10;
    this.state = {
      squares: Array.from({ length: this.playSize }).map(() =>
        Array(this.playSize).fill(null)
      ),
      xIsNext: true,
      lastMove: [],
      movesCount: 0,
      player: 0,
      handleClick: this.handleClick
    };
  }

  componentDidUpdate() {
    calculateWinner(this.state);
  }

  handleClick = (event, x, y) => {
    const squares = cloneDeep(this.state.squares);

    if (calculateWinner(this.state) || squares[x][y]) return;
    squares[x][y] = this.state.xIsNext ? 1 : 2;

    const coordinates = [Number(x), Number(y)];

    this.setState(state => ({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      lastMove: coordinates,
      player: this.state.xIsNext ? 1 : 2,
      movesCount: state.movesCount + 1
    }));
  };

  resetGame = () => {
    const emptySquares = Array.from({ length: this.playSize }).map(() =>
      Array(this.playSize).fill(null)
    );

    this.setState({
      squares: emptySquares,
      xIsNext: true,
      lastMove: [],
      movesCount: 0,
      player: ""
    });
  };

  render() {
    let status;
    let winStatus;
    const winner = calculateWinner(this.state);

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
          <Board squares={this.state.squares} />
          {winStatus}
        </GameContext.Provider>
      </GameContainer>
    );
  }
}

export default Game;
