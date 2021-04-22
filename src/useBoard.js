import { useState } from "react";
import {
    createEmptyBoard,
    placeShipOnBoard,
    removeShipFromBoard,
} from "./game/board";
// name clash fix this
const setPlace = placeShipOnBoard;

export const useBoard = (width, isAI) => {
    const [board, setBoard] = useState(() => createEmptyBoard(10));

    const placeShipOnBoard = (ship, y, x, horizontal) => {
        setBoard((oldBoard) => setPlace(oldBoard, y, x, ship, horizontal));
    };
    const removeShipFromBoardState = (ship) => {
        setBoard((oldBoard) => removeShipFromBoard(oldBoard, ship));
    };
    return [board, placeShipOnBoard, removeShipFromBoardState, setBoard];
};
