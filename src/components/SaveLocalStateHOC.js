import React from "react";
import { GameContext } from "./Game";

const SaveLocalStateHOC = Component => props => {
  return (
    <GameContext.Consumer>
      {({ handleClick }) => (
        <Component
          {...props}
          onClick={event => handleClick(event, props.axisX, props.axisY)}
        />
      )}
    </GameContext.Consumer>
  );
};

export default SaveLocalStateHOC;
