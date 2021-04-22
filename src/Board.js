import {
  BoardAndLabelWrapper,
  BoardLabel,
  BoardWrapper,
  PlayCell,
} from "./styles/components";
import { useContext } from "react";
import { GameContext } from "./Game";
import { GameDispatch } from "./Game";
import { AlertContext } from "./App";

export const Board = ({ board, playerID, isAI, statBoard, over }) => {
  const { players, turnIndex, playerList, allowAttack } = useContext(
    GameContext
  );
  const dispatch = useContext(GameDispatch);
  const addAlert = useContext(AlertContext);

  const createCells = (board) => {
    return board.map((row, y) => {
      return row.map((cell, x) => {
        // attack Handler defined here so it has access to x,y closure
        const handleAttack = () => {
          if (players[playerList[turnIndex]].ai) return; // don't allow click attack on AI turn
          if (playerID === playerList[turnIndex]) return; //don't allow attacks on own board;
          if (!allowAttack) return; // don't allow more than 1 attack per turn
          if (cell.attacked) return; // don't do anything if its already been attacked
          dispatch({
            type: "ATTACK",
            playerID: playerID,
            payload: [y, x],
          });
          if (cell.ship) {
            console.log("hit!");
            addAlert({ type: "HIT", message: "HIT!" });
          } else {
            addAlert({ type: "MISS", message: "MISS!" });
          }
          // set next turn after attack timeout
          setTimeout(() => {
            dispatch({ type: "SET-NEXT-TURN" });
          }, 1500);
        };
        return (
          <PlayCell
            showShip={statBoard}
            key={`cell_${playerID}_${y}-${x}`}
            cell={cell}
            onClick={handleAttack}
          />
        );
      });
    });
  };
  return (
    <BoardAndLabelWrapper>
      <BoardLabel>{players[playerID].name}</BoardLabel>
      <BoardWrapper over={over} statBoard={statBoard} boardWidth={board.length}>
        {createCells(board)}
      </BoardWrapper>
    </BoardAndLabelWrapper>
  );
};
