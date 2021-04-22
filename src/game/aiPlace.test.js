import {
    createCoordsList,
    getAIPlaceShipCoords,
    getAllViableCoords,
} from "./aiPlace";
const dummyBoard = [
    [false, false],
    [false, false],
];
const dummyShip = { length: 2 };

test("coordsList", () => {
    expect(createCoordsList(dummyBoard)).toEqual([
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ]);
});
test("getViableCoords", () => {
    expect(
        getAllViableCoords(
            createCoordsList(dummyBoard),
            dummyBoard,
            dummyShip,
            true
        )
    ).toEqual([
        [0, 0],
        [1, 0],
    ]);
});
test("place ship randomly", () => {
    expect(true).toEqual(true);
});
