export const defaultShipArray = [
    { name: "patrol boat", length: 2 },
    { name: "submarine", length: 3 },
    { name: "destroyer", length: 4 },
    { name: "battleship", length: 4 },
    { name: "carrier", length: 5 },
];

const createShip = (name, length) => {
    return {
        name,
        length,
        hits: 0,
        sunk: false,
        placed: false,
    };
};

export const createFleet = (ships) => {
    return ships.map(({ name, length }) => createShip(name, length));
};
