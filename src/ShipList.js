import { ShipStats } from "./ShipStats";

export const ShipList = ({
  ships,
  selectShipToPlaceOrReplace,
  indexOfShipToPlace,
  clickable,
  placement,
}) => {
  const createShipList = (shipList) => {
    return shipList.map((ship, shipIndex) => (
      <ShipStats
        placement={placement}
        clickable={clickable}
        key={`ship_list_${shipIndex}`}
        shipIndex={shipIndex}
        ship={ship}
        selectShipToPlaceOrReplace={selectShipToPlaceOrReplace}
        indexOfShipToPlace={indexOfShipToPlace}
      />
    ));
  };
  return <ul>{createShipList(ships)}</ul>;
};
