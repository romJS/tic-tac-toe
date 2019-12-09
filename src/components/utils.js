export const calculateWinner = state => {
  let coordinates = state.lastMove;
  const squares = state.squares;
  const player = state.player;
  let col = 0;
  let row = 0;
  let diagonal1 = 0;
  let diagonal2 = 0;

  // EACH LOOP ITERATES TROUGH THE TARGETED COLUMN / ROW / DIAGONAL DIRECTIONS
  //// UP ---> DOWN ////
  for (let i = coordinates[1]; i < 10; i++) {
    if (squares[coordinates[0]][i] === player) {
      col++;
    } else {
      break;
    }
  }
  //// DOWN ---> UP ////
  for (let i = coordinates[1] - 1; i >= 0; i--) {
    if (squares[coordinates[0]][i] === player) {
      col++;
    } else {
      break;
    }
  }
  //// RIGHT ---> LEFT ////
  for (let i = coordinates[0]; i < 10; i++) {
    if (squares[i][coordinates[1]] === player) {
      row++;
    } else {
      break;
    }
  }
  //// LEFT ---> RIGHT ////
  for (let i = coordinates[0] - 1; i >= 0; i--) {
    if (squares[i][coordinates[1]] === player) {
      row++;
    } else {
      break;
    }
  }
  //// DOWN-RIGHT ---> UP-LEFT///
  let x = coordinates[0];
  let y = coordinates[1];
  while (x >= 0 && y >= 0) {
    if (squares[x][y] === player) {
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
    if (squares[x][y] === player) {
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
    if (squares[x][y] === player) {
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
    if (squares[x][y] === player) {
      diagonal2++;
    } else {
      break;
    }
    x++;
    y--;
  }

  const winNumber = 4;
  if (
    col === winNumber ||
    row === winNumber ||
    diagonal1 === winNumber ||
    diagonal2 === winNumber
  ) {
    return player === 1 ? "X" : "O";
  }
  return null;
};
