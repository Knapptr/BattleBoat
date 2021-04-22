import { Board } from "./Board";

export const createBoards = (
  allBoards,
  listOfPlayersToRender,
  players,
  turnIndex
) => {
  // playerList is ONLY players who should have boards rendered. Logic should happen in 'HumanTurn and AITurn'
  return listOfPlayersToRender.map((player) => (
    // <PlayerBoardWrapper key={`board_${player}`}>
    <Board
      key={`board_${player}`}
      board={allBoards[player]}
      playerID={player}
      isAI={players[player].ai}
    />
  ));
};
