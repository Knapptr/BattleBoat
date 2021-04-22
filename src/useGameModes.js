import { useState } from "react";

const initializeGameState = (playerCount, numberOfAI) => {
    // players are either TRUE(human) or FALSE(AI)
    // numberOfAI MUST be <= playerCount
    //create humans
    const players = [];
    for (let i = 0; i < playerCount; i++) {
        if (i < playerCount - numberOfAI) {
            players.push(true);
        } else {
            players.push(false);
        }
    }
    return {
        players,
        currentMode: "init",
        currentTurn: 0,
        turnCount: 0,
    };
};
export const useGameModes = (playerCount, aiCount) => {
    const [state, setGameState] = useState(() =>
        initializeGameState(playerCount, aiCount)
    );
    const [currentAttack, setCurrentAttack] = useState(null);
    const gameModes = ["init", "placement", "play", "over"];

    const makeAttack = (playerID, coords) => {
        // coords as [y,x],playerID as index of players
        setCurrentAttack({ playerID, coords });
    };
    const setMode = (modeIndex) => {
        setGameState((oldState) => {
            return {
                ...oldState,
                currentMode: gameModes[modeIndex],
            };
        });
    };
    const nextTurn = () => {
        const turnLogic = (turn) => {
            if (turn >= playerCount.length) {
                return 0;
            }
            return turn + 1;
        };
        setGameState((oldState) => {
            return {
                ...oldState,
                currentTurn: turnLogic(oldState.currentTurn),
                turnCount: oldState.turnCount + 1,
            };
        });
    };
    return { nextTurn, setMode, state, currentAttack, makeAttack };
};
