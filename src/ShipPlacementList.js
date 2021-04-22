import { useContext } from "react";
import { ShipList } from "./ShipList";
import { Orientation } from "./Orientation";
import { Button } from "./styles/components";
import { GameDispatch } from "./Game";

export const ShipPlacementList = ({
  shipsToPlace,
  toggleHorizontal,
  horizontalPlacement,
  playerToPlace,
  shouldPromptPlayerOk,
  confirmPlayerReady,
  selectShipToPlaceOrReplace,
  indexOfShipToPlace,
  initMessage,
  resetMessage,
}) => {
  const dispatch = useContext(GameDispatch);
  return (
    <>
      <div className="collapseRow">
        <ShipList
          placement
          clickable
          indexOfShipToPlace={indexOfShipToPlace}
          ships={shipsToPlace}
          selectShipToPlaceOrReplace={selectShipToPlaceOrReplace}
        />
        <Orientation
          toggleHorizontal={toggleHorizontal}
          ship={shipsToPlace[indexOfShipToPlace]}
          horizontalPlacement={horizontalPlacement}
        />
      </div>
      <div className="buttons">
        {!shouldPromptPlayerOk ? (
          <>
            <Button
              onClick={() => {
                dispatch({
                  type: "RANDOM-PLACE-ONE",
                  playerID: playerToPlace,
                  payload: shipsToPlace[indexOfShipToPlace],
                });
              }}>
              <span>Randomize Ship</span>
            </Button>
            <Button>
              <span
                onClick={() => {
                  dispatch({
                    type: "RANDOM-PLACE-ALL",
                    playerID: playerToPlace,
                  });
                }}>
                Randomize Fleet
              </span>
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                // this timeout is to accomodate the fade out of this component.
                setTimeout(() => {
                  confirmPlayerReady(playerToPlace);
                }, 500);
              }}>
              Ok?
            </Button>
            <Button
              onClick={() => {
                resetMessage(initMessage());
                dispatch({
                  type: "CLEAR-BOARD",
                  playerID: playerToPlace,
                });
              }}>
              Reset
            </Button>
          </>
        )}
      </div>
    </>
  );
};
