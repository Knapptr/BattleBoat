export const aiAttack = (aiID, playerList, boards) => {
  // can't attack self
  const possiblePlayersToAttack = playerList.filter(
    (player) => player !== aiID
  );
  // select a random player to attack
  const indexOfPlayerToAttack = Math.floor(
    Math.random() * possiblePlayersToAttack.length
  );
  // assign ID of player to be attacked
  const playerID = possiblePlayersToAttack[indexOfPlayerToAttack];
  // get possible coords of board
  const boardToAttack = boards[playerID];
  // flatten array of all cells to make it easier to work with
  const allCellsOnBoard = boardToAttack.reduce((acc, current) =>
    acc.concat(current)
  );
  const allHitsOnBoard = allCellsOnBoard.filter(
    (cell) => cell.attacked && cell.ship
  );
  /// this logic is written assuming that it is a level playing field.
  /// ai attacks will not be based on any knowledge that player doesn't have
  const testForAdjacentCoords = (board, coords) => {
    const [y, x] = coords;
    // get coords that are in range but adjacent
    const adjacentCoords = [];
    // there is probably a way to DRY this.
    if (y + 1 < board.length) adjacentCoords.push([y + 1, x]);
    if (y - 1 < board.length && y - 1 >= 0) adjacentCoords.push([y - 1, x]);
    if (x + 1 < board.length) adjacentCoords.push([y, x + 1]);
    if (x - 1 < board.length && x - 1 >= 0) adjacentCoords.push([y, x - 1]);
    return adjacentCoords;
  };
  // get all cells adjacent to all hits on board that

  let cellsNextToHits = allHitsOnBoard.map((cell) =>
    testForAdjacentCoords(boardToAttack, [cell.y, cell.x])
  );
  //flatten cells Next to HIts
  if (cellsNextToHits.length > 0) {
    cellsNextToHits = cellsNextToHits.reduce((acc, cv) => acc.concat(cv));
  }

  // make a list of all coords that can be attacked
  const allUnattackedCoords = allCellsOnBoard
    .filter((cell) => cell.attacked === false)
    .map((cell) => [cell.y, cell.x]);

  const unAttackedCellsNextToHits = cellsNextToHits.filter((coordsToTest) => {
    return boardToAttack[coordsToTest[0]][coordsToTest[1]].attacked === false;
  });

  const arrayToSelectAttacksFrom =
    unAttackedCellsNextToHits.length > 0
      ? unAttackedCellsNextToHits
      : allUnattackedCoords;

  const randomCoordsIndexToAttack = Math.floor(
    Math.random() * arrayToSelectAttacksFrom.length
  );

  // get coords from list
  const randomCoords = arrayToSelectAttacksFrom[randomCoordsIndexToAttack];
  // make it nice
  const [y, x] = randomCoords;
  return { playerID, y, x };
};
