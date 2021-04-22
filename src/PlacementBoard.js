import { BoardWrapper } from "./styles/components";
import { PlacementCell } from "./PlacementCell";
import { usePointer } from "./pointer";

export const PlacementBoard = ({
  board,
  currentShip,
  horizontalPlacement,
  playerID,
  handlePlaceShip,
}) => {
  const pointer = usePointer(board, horizontalPlacement, currentShip);

  const createCells = (board) => {
    return board.map((row, y) =>
      row.map((cell, x) => {
        return (
          <PlacementCell
            key={`placement ${y},${x}`}
            horizontalPlacement={horizontalPlacement}
            currentShip={currentShip}
            playerID={playerID}
            board={board}
            cell={cell}
            setPointer={pointer.setPointer}
            getSelectionInformation={
              pointer.getCurrentSelection
            }></PlacementCell>
        );
      })
    );
  };
  return (
    <BoardWrapper boardWidth={board.length} onMouseLeave={pointer.setNoPointer}>
      {createCells(board)}
    </BoardWrapper>
  );
};
