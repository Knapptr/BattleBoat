import {
    createShip,
    hitShip,
    sinkShip,
    attackShip,
    createShips,
    attackShipInfleet,
} from "./ship";

test("create a ship object", () => {
    expect(createShip("patrol boat", 2)).toEqual({
        name: "patrol boat",
        length: 2,
        hits: 0,
        sunk: false,
        placed: false,
    });
});
//test ship
const testShip = createShip("test ship", 2);
test("hit a ship", () => {
    expect(hitShip(testShip)).toEqual({ ...testShip, hits: 1 });
    expect(hitShip(hitShip(testShip))).toEqual({ ...testShip, hits: 2 });
});
test("sink ship", () => {
    expect(sinkShip(testShip)).toEqual({ ...testShip, sunk: true });
});
test("hit ship and sink", () => {
    expect(attackShip(attackShip(testShip))).toEqual({
        ...testShip,
        sunk: true,
        hits: 2,
    });
});

const mockFleet = [
    { name: "patrol boat", length: 2 },
    { name: "battleship", length: 4 },
];

test("create fleet", () => {
    expect(createShips(mockFleet)).toEqual([
        createShip("patrol boat", 2),
        createShip("battleship", 4),
    ]);
});
test("attack ship in fleet", () => {
    expect(attackShipInfleet(createShips(mockFleet), "patrol boat")).toEqual([
        { ...createShip("patrol boat", 2), hits: 1 },
        createShip("battleship", 4),
    ]);
});
