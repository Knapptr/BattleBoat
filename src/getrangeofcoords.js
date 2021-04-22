export const getRangeOfCoords = (y, x, ship, horizontal) => {
    let startIndex = horizontal ? x : y;
    const coordsList = [];
    for (let i = 0; i < ship.length; i++) {
        if (horizontal) {
            coordsList.push([y, startIndex]);
        } else {
            coordsList.push([startIndex, x]);
        }
        startIndex += 1;
    }
    return coordsList;
};
export const lookForArrayOfCoordsInArray = (array, y, x) => {
    return array[0] === y && array[1] === x;
};
