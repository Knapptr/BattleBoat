import { ReadyPrompt } from "./ReadyPrompt";
import { GameContext } from "./Game";
import { GameDispatch } from "./Game";
import { useContext } from "react";
import { Placement } from "./Placement";
import { Turns } from "./Turns";
import { GameOver } from "./GameOver";
import { Init } from "./Init";
import { NamePlayers } from "./NamePlayers";
import { TurnFader } from "./turnFader";
import { FadeSwitch } from "./FadeSwitch";

export const GameModeHelper = ({ mode }) => {
  const {
    playerList,
    players,
    turnIndex,
    currentTurnPlayerIsReady,
    gameOver,
  } = useContext(GameContext);

  const currentTurnPlayerID = gameOver ? playerList[0] : playerList[turnIndex];

  const dispatch = useContext(GameDispatch);

  const setPlayerReady = (playerID) => {
    dispatch({ type: "SET-TURN-READY" });
  };
  const prompt = (
    <ReadyPrompt
      playerID={currentTurnPlayerID}
      playerName={players[currentTurnPlayerID].name}
      setPlayerReady={setPlayerReady}
    />
  );
  const turns = <Turns />;
  const modeDisplayOptions = {
    init: <Init />,
    namePlayers: <NamePlayers />,
    setup: <Placement />,
    play: (
      <TurnFader
        showOne={currentTurnPlayerIsReady}
        trueContent={turns}
        falseContent={prompt}
        fadeTime={300}
      />
    ),
    over: <GameOver />,
  };

  return (
    <FadeSwitch
      optionsObject={modeDisplayOptions}
      currentOption={mode}
      fadeTime={500}
    />
  );
};
