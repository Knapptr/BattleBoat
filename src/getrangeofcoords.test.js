import { getRangeOfCoords } from "./getrangeofcoords";

const dummyShip = { length: 2 };
test("Horizontal", () => {
    expect(getRangeOfCoords(0, 0, dummyShip, true)).toEqual([
        [0, 0],
        [0, 1],
    ]);
});
test("Vertical", () => {
    expect(getRangeOfCoords(0, 0, dummyShip, false)).toEqual([
        [0, 0],
        [1, 0],
    ]);
});
test("Horizontal, mid", () => {
    expect(getRangeOfCoords(4, 6, dummyShip, true)).toEqual([
        [4, 6],
        [4, 7],
    ]);
});
