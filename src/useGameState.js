import { useState, useReducer } from "react";

const staticInitialState = {
    currentAttack: null,
    currentTurn: 0,
    turnCount: 0,
};
const initializeState = ({ playerCount, aiCount }) => {
    const players = [];
    for (let i = 0; i < playerCount; i++) {
        if (i < playerCount - aiCount) {
            players.push(true);
        } else {
            players.push(false);
        }
    }
    return { ...staticInitialState, players };
};

const reducer = (state, action) => {
    switch (action.type) {
        case "attack":
            return { ...state, currentAttack: action.payload };
    }
};

export const useGameState = (playerCount, aiCount) => {
    const [gameState, dispatch] = useReducer(
        reducer,
        { playerCount, aiCount },
        initializeState
    );
    return { gameInfo: gameState, dispatch };
};
