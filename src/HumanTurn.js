import { Sidebar } from "./styles/components";
import { Board } from "./Board";
import { ShipList } from "./ShipList";
import { createBoards } from "./boardRenderHelper";

export const HumanTurn = ({
  players,
  playerList,
  turnIndex,
  boards,
  ships,
}) => {
  const listOfPlayersToRender = playerList.filter(
    (player) => player !== playerList[turnIndex]
  );

  // needs to handle turn transitions!
  // hide board information between human players transitioning
  return (
    <>
      <Sidebar>
        <div className="turnInfo">
          <header>
            <h4 className="currentPlayerTurn">
              {players[playerList[turnIndex]].name}
            </h4>
          </header>
        </div>
        <div className="playerInfo">
          <div className="shipInfo">
            <ShipList clickable={false} ships={ships[playerList[turnIndex]]} />
          </div>
          <Board
            statBoard
            board={boards[playerList[turnIndex]]}
            playerID={playerList[turnIndex]}
            isAI={false}
          />
        </div>
      </Sidebar>
      <div className="boards">
        {createBoards(boards, listOfPlayersToRender, players, turnIndex)}
      </div>
    </>
  );
};
