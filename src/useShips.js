import { useState, useEffect } from "react";
import ships from "./ship";
const {
    setShipPlacedInFleet,
    createShips,
    attackShipInFleet,
    defaultShipArray,
} = ships;

export const useShips = () => {
    const [placementQueueIndex, setPlacementQueueIndex] = useState(0);

    const [playerShips, setPlayerShips] = useState(() =>
        createShips(defaultShipArray)
    );
    const attackAndHit = (shipName) => {
        setPlayerShips((oldShips) => attackShipInFleet(oldShips, shipName));
    };
    const logShipAsPlaced = (shipName) => {
        if (!playerShips.every((ship) => ship.placed === true)) {
            setPlayerShips((oldShips) =>
                setShipPlacedInFleet(oldShips, shipName)
            );
        }
    };
    // increase queue after ship has been placed
    useEffect(() => {
        if (!playerShips.every((ship) => ship.placed === true)) {
            let testIndex = placementQueueIndex;
            console.log("testing", playerShips[testIndex]);
            while (playerShips[testIndex].placed === true) {
                testIndex += 1;
                console.log("index is now", testIndex);
                if (testIndex >= playerShips.length) {
                    console.log("if block");
                    testIndex = 0;
                }
            }
            setPlacementQueueIndex(testIndex);
        }
    }, [playerShips, placementQueueIndex]);

    const unplaceShip = (ship) => {
        setPlayerShips((oldShips) => {
            return oldShips.map((entry) => {
                return entry.name === ship.name
                    ? { ...entry, placed: false }
                    : entry;
            });
        });
    };
    const selectPlacement = (index) => {
        if (index >= 0 && index < playerShips.length) {
            setPlacementQueueIndex(index);
            return;
        }
        //handle out of range selection
        console.log("selection is out of range");
    };
    const checkIfAllShipsPlaced = () => {
        return playerShips.every((ship) => ship.placed === true);
    };
    return {
        ships: playerShips,
        queue: placementQueueIndex,
        logShipAsPlaced,
        unplaceShip,
        attackAndHit,
        selectPlacement,
        checkIfAllShipsPlaced,
    };
};
