export const setShipPlaced = (ship) => {
    return { ...ship, placed: true };
};
export const setShipPlacedInFleet = (fleet, shipToPlace) => {
    return fleet.map((ship) =>
        ship.name === shipToPlace.name ? setShipPlaced(ship) : ship
    );
};
export const testSunk = (ship) => {
    return ship.hits >= ship.length ? true : false;
};
export const unplaceShip = (ships, ship) => {
    return ships.map((entry) => {
        return entry.name === ship.name ? { ...entry, placed: false } : entry;
    });
};
export const testIfAllShipsPlaced = (ships) => {
    return ships.every((ship) => {
        return ship.placed;
    });
};
export const createShip = (name, length) => {
    return {
        name: name,
        length: length,
        hits: 0,
        sunk: false,
        placed: false,
    };
};
export const hitShip = (ship) => {
    const hits = ship.hits;
    return { ...ship, hits: hits + 1 };
};
export const sinkShip = (ship) => {
    return { ...ship, sunk: true };
};
export const attackShip = (ship) => {
    let returnShip = hitShip(ship);
    if (returnShip.length <= returnShip.hits) {
        returnShip = sinkShip(returnShip);
    }
    return returnShip;
};
export const attackShipInfleet = (ships, name) => {
    const newShips = [...ships];
    const index = newShips.findIndex((ship) => ship.name === name);
    let hitShip = { ...newShips[index] };
    hitShip.hits += 1;
    if (testSunk(hitShip)) hitShip.sunk = true;

    newShips[index] = hitShip;
    return newShips.map((ship) => ship);
};
const ships = {
    // defaultShipArray,
    attackShipInfleet,
    // createShips,
    setShipPlacedInFleet,
    testIfAllShipsPlaced,
};
export default ships;
