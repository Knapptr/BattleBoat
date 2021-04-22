import { AITurn } from "./AITurn";
import { HumanTurn } from "./HumanTurn";
import { useContext, useRef, useEffect, useState } from "react";
import { GameContext } from "./Game";
import { TurnFader } from "./turnFader";

//Is 'currentlyDisplayedTurn doing ANYTHING?. I dont think so. Refactor this...

export const Turns = () => {
  const { boards, ships, turnIndex, playerList, players } = useContext(
    GameContext
  );
  console.log("turn index:", turnIndex);
  console.log("playerlist", playerList);
  // iniitial value is of the current player
  const [currentlyDisplayedTurn, setCurrentlyDisplayedTurn] = useState(
    turnIndex
  );
  const actualCurrentPlayer = players[playerList[turnIndex]];
  const [shouldShowAIPlayer, setshouldShowAIPlayer] = useState(
    actualCurrentPlayer.ai
  );
  //change the currentlyDisplayed on a timeout after the turn changes to allow for fading.
  const hasMounted = useRef(false); //to not run effectd on mount

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setshouldShowAIPlayer(players[playerList[turnIndex]].ai);
    const timeoutID = setTimeout(() => {
      setCurrentlyDisplayedTurn(turnIndex);
      console.log("changing currentDispTurn to", turnIndex);
    }, 2500);
    return () => clearTimeout(timeoutID);
  }, [turnIndex, players, playerList]);
  // Human/AI turns take data from state here. State is changed by game context, but with a a timeout to keep components from rendering the wrong data.

  const humanTurn = (
    <HumanTurn
      playerList={playerList}
      players={players}
      boards={boards}
      turnIndex={currentlyDisplayedTurn}
      ships={ships}
    />
  );

  return (
    <TurnFader
      showOne={shouldShowAIPlayer}
      trueContent={<AITurn />}
      falseContent={humanTurn}
      fadeTime={500}
    />
    // return currentPlayer.ai ? (
    //     <AITurn />
    // ) : (
    //     <HumanTurn
    //         playerList={playerList}
    //         players={players}
    //         boards={boards}
    //         turnIndex={currentlyDisplayedTurn}
    //         ships={ships}
    //     />
    // );
  );
};
