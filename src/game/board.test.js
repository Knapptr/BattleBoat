import {
    createBoard,
    createRow,
    createCell,
    attackBoard,
    clearAttacks,
    checkIfRangeOfCellsAreClear,
    getVerticalCellsOfBoard,
    checkIfRangeIsViable,
    checkIfRangeIsInBounds,
    placeHorizontalShip,
    placeVerticalShip,
    placeShipOnBoard,
} from "./board";

test("Check if cells are clear", () => {
    const dummyAllClear = [
        [false, false],
        [false, false],
    ];
    const dummyHasShip = [
        ["patrol boat", false],
        [false, false],
    ];
    expect(checkIfRangeOfCellsAreClear(dummyAllClear, 0, 0, 2, true)).toBe(
        true
    );
    expect(checkIfRangeOfCellsAreClear(dummyHasShip, 0, 0, 2, false)).toBe(
        false
    );
});
test("get vertical range of board", () => {
    const dummyVerticalShipBoard = [
        ["boat", false],
        ["boat", false],
    ];
    expect(getVerticalCellsOfBoard(dummyVerticalShipBoard, 0, 0, 2)).toEqual([
        "boat",
        "boat",
    ]);
});
test("test ranges of cells", () => {
    let dummyShipBoard = [
        ["patrol", false, "patrol", "patrol"],
        ["patrol", false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ];
    //horizontal
    expect(checkIfRangeOfCellsAreClear(dummyShipBoard, 0, 0, 2, false)).toEqual(
        false
    );
    //vertical
    expect(checkIfRangeOfCellsAreClear(dummyShipBoard, 0, 2, 2, true)).toEqual(
        false
    );
    //clear horizontal
    expect(checkIfRangeOfCellsAreClear(dummyShipBoard, 2, 2, 2, false)).toEqual(
        true
    );
    //clear vertical
    expect(checkIfRangeOfCellsAreClear(dummyShipBoard, 2, 2, 2, true)).toEqual(
        true
    );
});
test("check range inbound", () => {
    const twobyboard = [
        [false, false],
        [false, false],
    ];
    const fourbyboard = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ];
    expect(checkIfRangeIsInBounds(fourbyboard, 0, 6, 4, true)).toBe(false);
    expect(checkIfRangeIsInBounds(twobyboard, 0, 0, 2, true)).toBe(true);
    expect(checkIfRangeIsInBounds(twobyboard, 0, 1, 2, true)).toBe(false);
    expect(checkIfRangeIsInBounds(twobyboard, 0, 0, 2, false)).toBe(true);
    expect(checkIfRangeIsInBounds(twobyboard, 0, 0, 3, false)).toBe(false);
    expect(checkIfRangeIsInBounds(twobyboard, 0, 0, 3, true)).toBe(false);
});
test("viable cells", () => {
    const dummyShipBoard = [
        ["patrol", false, "patrol", "patrol"],
        ["patrol", false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ];
    //horizontal, not viable
    expect(checkIfRangeIsViable(dummyShipBoard, 0, 0, 4, false)).toBe(false);
    //vertical, not viable
    expect(checkIfRangeIsViable(dummyShipBoard, 0, 0, 4, true)).toBe(false);
    //horizonta, viable
    expect(checkIfRangeIsViable(dummyShipBoard, 3, 0, 4, true)).toBe(true);
    //vertical, viable
    expect(checkIfRangeIsViable(dummyShipBoard, 0, 1, 4, false)).toBe(true);
    //out of range
    expect(checkIfRangeIsViable(dummyShipBoard, 5, 0, 4, true)).toBe(false);
    expect(checkIfRangeIsViable(dummyShipBoard, 0, 6, 4, true)).toBe(false);
});

test("place horizontal ship", () => {
    const rowBoard = [[false, false, false, false]];
    const ship = { name: "ship", length: 2 };
    expect(placeHorizontalShip(rowBoard, 0, 0, ship)).toEqual([
        ["ship", "ship", false, false],
    ]);
});
test("place vertical ship", () => {
    const twoBy = [
        [false, false],
        [false, false],
    ];
    const ship = { name: "ship", length: 2 };
    expect(placeVerticalShip(twoBy, 0, 0, ship)).toEqual([
        ["ship", false],
        ["ship", false],
    ]);
});
test("placeShipOnBoard", () => {
    const fullBoard = Array(10).fill(Array(10).fill(false));
    const ship = { name: "Battleship", length: 4 };
    expect(placeShipOnBoard(fullBoard, 0, 0, ship, true)).toEqual([
        [
            "Battleship",
            "Battleship",
            "Battleship",
            "Battleship",
            false,
            false,
            false,
            false,
            false,
            false,
        ],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
    ]);
});
test("testforship", () => {
    const board = [
        ["battleship", false],
        ["battleship", false],
    ];
    expect(checkIfRangeIsViable(board, 0, 0, 2, true)).toBe(false);
    expect(checkIfRangeIsViable(board, 0, 0, 2, false)).toBe(false);
    expect(checkIfRangeIsViable(board, 0, 1, 2, false)).toBe(true);
    expect(checkIfRangeIsViable(board, 1, 0, 2, true)).toBe(false);
});
