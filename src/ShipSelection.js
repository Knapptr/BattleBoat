import { useContext } from "react";
import { PlayerContext } from "./Player";
import {
    ShipSelectionWrapper,
    ShipInfo,
    ShipCell,
    ShipWrapper,
} from "./styles/components";

import { GameContext } from "./Game";

const ShipSelection = ({ horizontal, toggleHorizontal }) => {
    const { setMode } = useContext(GameStateContext);
    const {
        ships,
        selectPlacement,
        rePlaceShip,
        queue,
        checkIfAllShipsPlaced,
        randomlyPlaceShips,
    } = useContext(PlayerContext);

    const handleEndOfSelection = () => {
        setMode(2);
    };
    const modelShip = (ship) => {
        return Array(ship.length).fill(<ShipCell></ShipCell>);
    };
    const createShips = (ships) => {
        return ships.map((ship, shipIndex) => {
            const handleShipSelection = (e) => {
                selectPlacement(shipIndex);
            };
            const handleShipRePlace = (e) => {
                rePlaceShip(ship);
                selectPlacement(shipIndex);
            };
            return (
                <ShipInfo
                    areAllShipsPlaced={checkIfAllShipsPlaced()}
                    currentSelection={shipIndex === queue}
                    placed={ship.placed}
                    onClick={
                        ship.placed ? handleShipRePlace : handleShipSelection
                    }>
                    <text>{ship.name}</text>
                    <ShipWrapper>{modelShip(ship)}</ShipWrapper>
                </ShipInfo>
            );
        });
    };
    return (
        <ShipSelectionWrapper>
            {createShips(ships)}
            {ships.every((ship) => ship.placed === true) ? (
                <button onClick={handleEndOfSelection}>I'm Ready!</button>
            ) : (
                <button onClick={toggleHorizontal}>
                    Place {horizontal ? "Vertical" : "Horizontal"}
                </button>
            )}
            <button onClick={randomlyPlaceShips}>Randomly Place</button>
        </ShipSelectionWrapper>
    );
};
