import { GameContext, GameDispatch } from "./Game";
import { useContext } from "react";
import { Card, Button } from "./styles/components";
import { Board } from "./Board";
import { countFleetSuccess } from "./gamehelpers";

export const GameOver = () => {
  const dispatch = useContext(GameDispatch);
  const { players, playerList, boards, ships } = useContext(GameContext);

  const winningPlayer = players[playerList[0]];
  const winningPlayerShips = ships[playerList[0]];
  const fleetStats = countFleetSuccess(winningPlayerShips);
  return (
    <Card>
      <header>
        <h2>{players[playerList[0]].name} wins!</h2>
      </header>
      <div className="content">
        <Board
          over
          statBoard
          board={boards[playerList[0]]}
          playerID={playerList[0]}
          isAI={false}
        />
        <ul className="stats">
          <li>
            <p>Shots:</p>
            <p>{winningPlayer.shots}</p>
          </li>
          <li>
            <p>Hit Percentage:</p>
            <p>
              {Math.round((winningPlayer.hits / winningPlayer.shots) * 100)}%
            </p>
          </li>
          <li>
            <p>Total hits on fleet</p>
            <p>
              {fleetStats.totalHits}/{fleetStats.fleetSize}
            </p>
          </li>
        </ul>
      </div>
      <div className="controls">
        <Button
          onClick={() => {
            dispatch({
              type: "SET-MODE",
              payload: "init",
            });
          }}>
          New Game
        </Button>
      </div>
    </Card>
  );
};
