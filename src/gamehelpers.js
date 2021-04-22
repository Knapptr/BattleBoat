export const checkIfPlayerOutOfGame = (ships) => {
    // check if all of players ships are sunk
    return ships.every((ship) => ship.sunk) ? true : false;
};
export const checkIfGameOver = (playersInGame) => {
    // check and see if there is 1 remaining player
    return playersInGame.length === 1 ? true : false;
};

export const handleTurns = (numberOfPlayers, currentTurn) => {
    // increment the turn by 1, unless its the last players turn- then go to start
    const nextTurn = currentTurn >= numberOfPlayers - 1 ? 0 : currentTurn + 1;
    return nextTurn;
};

export const countFleetSuccess = (ships) => {
    const fleetSize = ships.reduce((acc, cv) => {
        return acc + cv.length;
    }, 0);
    const totalHits = ships.reduce((acc, cv) => {
        return acc + cv.hits;
    }, 0);
    return { totalHits, fleetSize };
};
