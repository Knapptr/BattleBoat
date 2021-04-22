import { createContext, useReducer } from "react";
import {
  defaultInitialState,
  createInitialState,
  gameReducer,
} from "./refactoredLogic";
import { GameModeHelper } from "./gameModeHelper";

export const GameContext = createContext(null);
export const GameDispatch = createContext(null);

export const Game = () => {
  const [gameState, dispatch] = useReducer(
    gameReducer,
    defaultInitialState,
    createInitialState
  );

  return (
    <GameContext.Provider value={gameState}>
      <GameDispatch.Provider value={dispatch}>
        <GameModeHelper mode={gameState.gameMode} />
      </GameDispatch.Provider>
    </GameContext.Provider>
  );
};
