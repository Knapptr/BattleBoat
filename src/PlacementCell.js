import { useContext } from "react";
import { StyledPlacementCell } from "./styles/components.js";
import { GameDispatch } from "./Game";

export const PlacementCell = ({
  cell,
  setPointer,
  getSelectionInformation,
  board,
  playerID,
  currentShip,
  horizontalPlacement,
}) => {
  const { x, y, ship } = cell;
  const dispatch = useContext(GameDispatch);

  const handleHover = () => {
    setPointer(y, x);
  };
  // return how the cell should appear when rendered
  const checkIfValid = () => {
    let currentSelection = getSelectionInformation();
    if (!currentSelection.valid) return false;
    //check if there is a ship in current selection
    if (
      currentSelection.cells.some((coords) => {
        // return false if any cell has a ship
        return board[coords[0]][coords[1]].ship !== false;
      })
    ) {
      return false;
    }
    return true;
  };
  const testRenderStyle = () => {
    if (ship) return "ship";
    let currentSelection = getSelectionInformation();
    // check if cell is in range. render appropriately
    if (
      currentSelection.cells.some(
        (coords) => coords[0] === y && coords[1] === x
      )
    ) {
      // check if selection has any out of bounds
      //check if there is a ship in current selection
      if (currentShip.placed) return;
      return checkIfValid() ? "valid" : "invalid";
    }
    // if cell doesn't have ship and isnt in selection
    return "empty";
  };
  const handlePlacement = () => {
    if (!checkIfValid()) return;
    if (currentShip.placed) return;

    dispatch({
      type: "PLACE-SHIP",
      playerID: playerID,
      payload: {
        x: x,
        y: y,
        ship: currentShip,
        horizontal: horizontalPlacement,
      },
    });
  };

  return (
    <>
      <StyledPlacementCell
        bg_color={testRenderStyle()}
        onMouseEnter={handleHover}
        onClick={handlePlacement}
      />
    </>
  );
};
