const cellTemplate = { ship: false, attacked: false, x: null, y: null };
export const createBoard = (boardWidth) => {
    let board = Array(boardWidth).fill(Array(boardWidth).fill(null));
    board = board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => ({
            ...cellTemplate,
            x: cellIndex,
            y: rowIndex,
        }))
    );
    return board;
};
