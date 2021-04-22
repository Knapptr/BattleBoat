import { checkIfRangeIsViable } from "./board";
// take an array of all possible coords and all ships
export const getAIPlaceShipCoords = (board, ship) => {
    const possibleCoords = createCoordsList(board); //create list of coords
    const randHorizontal = [true, false][Math.floor(Math.random() * 2)]; //horizontal or vertical
    // get all possible index coordinates (for end of ship)
    const viableCoords = getAllViableCoords(
        possibleCoords,
        board,
        ship,
        randHorizontal
    );
    // choose random coord for ship
    const randomViableCoordIndex = Math.floor(
        Math.random() * viableCoords.length
    );
    return {
        coords: viableCoords[randomViableCoordIndex],
        horizontal: randHorizontal,
    };
};
export const createCoordsList = (array2d) => {
    const coordsList = [];
    for (let yIndex = 0; yIndex < array2d.length; yIndex++) {
        for (let xIndex = 0; xIndex < array2d[yIndex].length; xIndex++) {
            coordsList.push([yIndex, xIndex]);
        }
    }
    return coordsList;
};
export const getAllViableCoords = (coords, board, ship, horizontal) => {
    return coords.filter((coordinate) => {
        return checkIfRangeIsViable(
            board,
            coordinate[0],
            coordinate[1],
            ship.length,
            horizontal
        );
    });
};

// filter array to all potential spots for each ship
// choose spot at random
