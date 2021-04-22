import { useEffect, useContext } from "react";
import { Board } from "./Board";
import { usePlayer } from "./usePlayer";
import { createContext } from "react";
import { usePointer } from "./pointer";
import { ShipSelection } from "./ShipSelection";
import { GameContext } from "./Game";
export const PlayerContext = createContext(null);
export const PointerContext = createContext(null);

export const Player = ({ playerID, mode, isAI, currentAttack }) => {
    const pointer = usePointer();
    const playerState = usePlayer(isAI);
    const game = useContext(GameContext);

    useEffect(() => {
        // places ships automatically on mount if it is an AI player
        if (playerState.isAI && !playerState.checkIfAllShipsPlaced()) {
            playerState.randomlyPlaceShips();
        }
    }, [playerState]);

    useEffect(() => {
        // This is for managing attacks each time the attack changes
        //do something
        console.log(currentAttack);
        if (!currentAttack) {
            return;
        }
        const [y, x] = currentAttack.coords;
        console.log(y, x);
        if (currentAttack.player === playerID) {
            if (playerState.board[y][x] !== false) {
                console.log("HIT");
            } else {
                console.log("MISS");
            }
        }
    }, [currentAttack]);

    return (
        <PlayerContext.Provider value={playerState}>
            <PointerContext.Provider value={pointer}>
                {mode === "placement" ? (
                    <ShipSelection
                        toggleHorizontal={pointer.toggleHorizontal}
                        horizontal={pointer.horizontalPlacement}
                    />
                ) : null}
                {mode === "play" ? (
                    <Board board={playerState.board} mode={mode} />
                ) : (
                    <Board board={playerState.board} mode={mode} />
                )}
            </PointerContext.Provider>
        </PlayerContext.Provider>
    );
};
