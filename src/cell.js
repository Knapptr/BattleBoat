import { useState, useContext } from "react";
import { StyledPlayCellWrapper } from "./styles/components.js";
import { PlayerContext } from "./Player";
import { GameDispatch } from "./Game";

export const Cell = ({ x, y }) => {
  const [clicked, setClicked] = useState(false);
  const { board } = useContext(PlayerContext);
  const dispatch = useContext(GameDispatch);

  const clickHandler = (e) => {
    if (!clicked) {
      setClicked(true);
      dispatch({
        type: "attack",
        payload: { player: 1, coords: [y, x] },
      });
    } // do something if already clicked
  };

  return (
    <>
      <StyledPlayCellWrapper
        x={x}
        y={y}
        board={board}
        hasShip={board[y][x] !== false}
        onClick={clickHandler}></StyledPlayCellWrapper>
    </>
  );
};
