import { useState } from "react";
import { checkIfRangeIsInBounds } from "./game/board";

export const usePointer = (board, horizontalPlacement, currentShip) => {
    const [currentPointer, setCurrentPointer] = useState({
        x: false,
        y: false,
    });

    const setPointer = (y, x) => {
        setCurrentPointer({ ...currentPointer, y, x });
    };
    const setNoPointer = () => {
        setCurrentPointer({ x: false, y: false });
    };
    const createArrayFromPointer = (y, x, ship) => {
        if (ship && x !== false && y !== false) {
            let startIndex = horizontalPlacement ? x : y;
            const coordsList = [];
            for (let i = 0; i < ship.length; i++) {
                if (horizontalPlacement) {
                    coordsList.push([y, startIndex]);
                } else {
                    coordsList.push([startIndex, x]);
                }
                startIndex += 1;
            }
            return coordsList;
        }
        return [];
    };
    const testIfSelectionInBounds = (board, ship) => {
        return checkIfRangeIsInBounds(
            board,
            currentPointer.y,
            currentPointer.x,
            ship.length,
            horizontalPlacement
        );
    };

    // this will return an object of {valid,cells}, where valid is if the current selection is in range, and the range of cells affected.It is a helper function. Maybe it should be moved out of usePointer??

    // only handles if selectin is out of bounds. DOES NOT HANDLE if there is a ship present in the range of cells. That is handled by the cell itslef
    const getCurrentSelection = () => {
        let currentCells = createArrayFromPointer(
            currentPointer.y,
            currentPointer.x,
            currentShip
        );
        // check if selection is in bounds
        let inBounds = testIfSelectionInBounds(board, currentShip);

        return { cells: currentCells, valid: inBounds };
    };
    return {
        currentPointer,
        setPointer,
        setNoPointer,
        getCurrentSelection,
    };
};
