import {
  ShipWrapper,
  ShipName,
  ShipModelWrapper,
  ShipCell,
} from "./styles/components";
import { useContext } from "react";
import { GameContext } from "./Game";

const createShipModel = (length) => {
  return (
    // {Array(length).fill(<ShipCell />)
    <ShipModelWrapper>
      {Array.from({ length }, (_, index) => (
        <ShipCell key={`shipCell_${index}`} />
      ))}
    </ShipModelWrapper>
  );
};

export const ShipStats = ({
  ship,
  selectShipToPlaceOrReplace,
  shipIndex,
  indexOfShipToPlace,
  clickable,
  placement,
}) => {
  const { players, playerList } = useContext(GameContext);
  const allPlayersPlaced = playerList.every(
    (player) => players[player].shipsPlaced === true
  );
  return (
    <ShipWrapper
      play={!placement}
      allPlayersPlaced={allPlayersPlaced}
      ship={ship}
      hasBeenPlaced={ship.placed}
      isCurrentShip={shipIndex === indexOfShipToPlace}
      onClick={() =>
        clickable ? selectShipToPlaceOrReplace(shipIndex) : null
      }>
      <ShipName>{ship.name}</ShipName>
      {createShipModel(ship.length)}
    </ShipWrapper>
  );
};
