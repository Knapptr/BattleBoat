export const checkIfCellIsInBounds = (board, coord) => {
    return coord < board.length && coord >= 0;
};
export const checkIfRangeIsInBounds = (board, y, x, length, horizontal) => {
    // check and make sure init coords are in bounds
    if (!checkIfCellIsInBounds(board, x) || !checkIfCellIsInBounds(board, y)) {
        return false;
    }
    // set point to compare to
    const comparePoint = horizontal ? x : y;
    // make comparison
    return board.length - comparePoint - length >= 0;
};
export const checkIfClear = (cell) => {
    return cell.ship ? false : true;
};
export const getVerticalCellsOfBoard = (board, y, x, length) => {
    // create array of only rows
    const relevantRows = board.slice(y, length + y);
    // get cell from each row within range
    const returnCells = relevantRows.map((row) => row[x]);
    // create array of vertical cells
    return returnCells;
};
export const getHorizontalCellsOfBoard = (board, y, x, length) => {
    return board[y].slice(x, x + length);
};
export const getRangeOfCells = (board, y, x, length, horizontal) => {
    return horizontal
        ? getHorizontalCellsOfBoard(board, y, x, length)
        : getVerticalCellsOfBoard(board, y, x, length);
};
export const testRangeOfCellsForShip = (cells) => {
    return cells.every(checkIfClear);
};
export const checkIfRangeOfCellsAreClear = (
    board,
    y,
    x,
    length,
    horizontal
) => {
    const cellsToCheck = getRangeOfCells(board, y, x, length, horizontal);
    return testRangeOfCellsForShip(cellsToCheck);
};
export const checkIfRangeIsViable = (board, y, x, length, horizontal) => {
    // check if coords are in bounds
    if (!checkIfRangeIsInBounds(board, y, x, length, horizontal)) {
        return false;
    }
    return checkIfRangeOfCellsAreClear(board, y, x, length, horizontal);
};
export const placeHorizontalShip = (board, y, x, ship) => {
    const returnBoard = [...board];
    returnBoard[y] = returnBoard[y].map((value, index) => {
        if (index >= x && index < ship.length + x) {
            return { ...value, ship: ship.name };
        }
        return value;
    });
    return returnBoard;
};
export const placeVerticalShip = (board, y, x, ship) => {
    // place ship on x of each row from row "y" to row "y+ship.length"
    return board.map((row, rowIndex) => {
        if (rowIndex >= y && rowIndex < y + ship.length) {
            return row.map((cell, colIndex) => {
                if (colIndex === x) {
                    return { ...cell, ship: ship.name };
                }
                return cell;
            });
        }
        return row;
    });
};
export const placeShipOnBoard = (board, y, x, ship, horizontal) => {
    return horizontal
        ? placeHorizontalShip(board, y, x, ship)
        : placeVerticalShip(board, y, x, ship);
};
export const removeShipFromBoard = (board, ship) => {
    return board.map((row) => {
        return row.map((cell) =>
            cell.ship === ship.name ? { ...cell, ship: false } : cell
        );
    });
};
export const attackCellOnBoard = (board, y, x) => {
    return board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
            return rowIndex === y && cellIndex === x
                ? { ...cell, attacked: true }
                : cell;
        })
    );
};
