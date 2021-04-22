import { useShips } from "./useShips";
import { useBoard } from "./useBoard";
import { getAIPlaceShipCoords } from "./game/aiPlace";
import { useState } from "react";
import {
    checkIfRangeIsViable,
    createEmptyBoard,
    placeShipOnBoard as placeShipOnBoardNoUpdate,
} from "./game/board";
export const usePlayer = (isAI) => {
    const [myTurn, setMyTurn] = useState(false);
    const [board, placeShipOnBoard, removeShipFromBoard, setBoard] = useBoard(
        10
    );
    const {
        ships,
        queue,
        logShipAsPlaced,
        unplaceShip,
        attackShip,
        selectPlacement,
        checkIfAllShipsPlaced,
    } = useShips();

    const placeShip = (board, ship, y, x, horizontal) => {
        if (!ships.every((ship) => ship.placed === true)) {
            if (checkIfRangeIsViable(board, y, x, ship.length, horizontal)) {
                placeShipOnBoard(ship, y, x, horizontal);
                logShipAsPlaced(ship.name);
            } else {
                // not implemented - trying to place a ship in an unviable location
                console.log("Log error message: not viable location");
            }
        } else {
            // not implemented- trying to place a ship when all have been placed
            console.log(
                "All ships are already placed. He's already pulled over, he can't pull over anymore!"
            );
        }
    };
    const rePlaceShip = (ship) => {
        console.log(ship, ships);
        if (ship.placed) {
            removeShipFromBoard(ship);
            unplaceShip(ship);
            selectPlacement(ships.indexOf(ship));
        } else {
            //not implmented
            // ship has not been placed, so it can not be re-placed
        }
    };
    const randomlyPlaceShips = () => {
        // clear board to init
        let newBoard = createEmptyBoard(board.length);
        ships.forEach((ship) => {
            const { coords, horizontal } = getAIPlaceShipCoords(newBoard, ship);
            const [y, x] = coords;
            newBoard = placeShipOnBoardNoUpdate(
                newBoard,
                y,
                x,
                ship,
                horizontal
            );
            logShipAsPlaced(ship);
        });
        setBoard(newBoard);
    };
    return {
        board,
        ships,
        myTurn,
        queue,
        attackShip,
        placeShip,
        rePlaceShip,
        selectPlacement,
        checkIfAllShipsPlaced,
        isAI,
        randomlyPlaceShips,
    };
};
