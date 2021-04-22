import { GameContext } from "./Game";
import { useContext, useEffect, useRef } from "react";
import { createBoards } from "./boardRenderHelper";
import { GameDispatch } from "./Game";
import { aiAttack } from "./aiAttack";
import { handleTurns } from "./gamehelpers";
import { AlertContext } from "./App";

//This component has become a veritable trashfire. To handle fades, cleanup functions are done with useRef- timeoutIDs are logged to the ref inside the useEffect. Sureley there is a better way. Refactor this...somehow.

export const AITurn = () => {
  const addAlert = useContext(AlertContext);
  const gameState = useContext(GameContext);
  const { boards, playerList, players, turnIndex } = gameState;
  const dispatch = useContext(GameDispatch);
  // uses full playerList to render boards: All boards should be rendered here.
  let attackTOIDs = useRef([]);
  let nextTOIDs = useRef([]);
  const currentPlayer = players[playerList[turnIndex]];
  let attackHasHappened = useRef(false);

  useEffect(() => {
    if (attackHasHappened.current) {
      attackHasHappened.current = false;
    }
  }, [turnIndex]);
  useEffect(() => {
    console.log("useEffect running in aiTurn");
    if (gameState.gameOver) return;
    if (!gameState.allowAttack) return;
    if (attackHasHappened.current) return;
    attackHasHappened.current = true;
    const currentTurn = gameState.playerList[gameState.turnIndex];
    if (gameState.players[currentTurn].ai) {
      const { y, x, playerID } = aiAttack(
        currentTurn,
        gameState.playerList,
        gameState.boards
      );
      let attackedCell = boards[playerID][y][x];
      let attackTOID = setTimeout(
        // attack after 1 second
        () => {
          if (attackedCell.ship) {
            // log message!
            console.log("hit!");
            addAlert({
              type: "HIT",
              message: `${currentPlayer.name} attacks ${players[playerID].name}...and hits!`,
            });
          } else {
            addAlert({
              type: "MISS",
              message: `${currentPlayer.name} attacks ${players[playerID].name}...and misses.`,
            });
          }
          dispatch({
            type: "ATTACK",
            playerID: playerID,
            payload: [y, x],
          });
        },
        1000
      );
      let nextPlayerShouldBe =
        players[playerList[handleTurns(playerList.length, turnIndex)]];
      let timeoutDelayUntilNextTurn = nextPlayerShouldBe.ai ? 2000 : 3000;
      let nextTOID = setTimeout(() => {
        dispatch({
          type: "SET-NEXT-TURN",
        });
      }, timeoutDelayUntilNextTurn);

      // do something if its an AI turn
      nextTOIDs.current.push(nextTOID);
      attackTOIDs.current.push(attackTOID);
    } else return;
  }, [
    dispatch,
    gameState.allowAttack,
    gameState.boards,
    gameState.gameOver,
    gameState.playerList,
    gameState.players,
    gameState.turnIndex,
    playerList,
    players,
    turnIndex,
    addAlert,
    boards,
    currentPlayer.name,
  ]);
  const cleanup = () => {
    nextTOIDs.current.forEach((timeout) => clearTimeout(timeout));
    attackTOIDs.current.forEach((timeout) => clearTimeout(timeout));
  };
  useEffect(() => {
    return () => cleanup();
  }, []);
  return (
    <div className="boards ai">
      {createBoards(boards, playerList, players, turnIndex)}
    </div>
  );
};
