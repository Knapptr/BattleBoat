import { useState, useContext, useEffect, useCallback } from "react";
import {
  Sidebar,
  SidebarMessage,
  SidebarMessageText,
} from "./styles/components";
import { ShipPlacementList } from "./ShipPlacementList";
import { PlacementBoard } from "./PlacementBoard";
import { GameContext, GameDispatch } from "./Game";

export const Placement = () => {
  const [horizontalPlacement, setHorizontalPlacement] = useState(false);
  const { boards, ships, playerList, players, gameMode } = useContext(
    GameContext
  );
  const [playerToPlace, setPlayerToPlace] = useState({
    index: 0,
    id: "player_0",
    name: players[playerList[0]].name,
  });
  const dispatch = useContext(GameDispatch);
  // select player to place
  const [indexOfShipToPlace, setIndexOfShipToPlace] = useState(0);
  const [shouldPromptPlayerOk, setShouldPromptPlayerOk] = useState(false);
  const [fadeInText, setFadeInText] = useState(false);
  const initMessageText = () => {
    return `${playerToPlace.name}, place your ships.`;
  };
  const [sideBarMessage, setSideBarMessage] = useState(initMessageText);

  const fadeOutInText = useCallback((newText) => {
    setFadeInText(false);
    return setTimeout(() => {
      // return a timeout ID to clear timeout
      setSideBarMessage(newText);
      setFadeInText(true);
    }, 300);
  }, []);

  //update message any time player changes
  useEffect(() => {
    if (!playerToPlace) return;
    const timeoutID = fadeOutInText(`${playerToPlace.name}, place your ships.`);
    return () => clearTimeout(timeoutID); // this will clear the timeout if the component is unmounted before it is called.
  }, [playerToPlace, fadeOutInText]);

  const selectIndexOfShip = (index) => {
    setIndexOfShipToPlace(index);
    //if the ship is placed already- unplace it
    if (ships[playerToPlace.id][index].placed) {
      if (sideBarMessage === "Ready?") fadeOutInText(initMessageText());
      dispatch({
        type: "REMOVE-SHIP",
        playerID: playerToPlace.id,
        payload: ships[playerToPlace.id][index],
      });
    }
  };

  // check if all ships are placed to toggle player prompt
  useEffect(() => {
    // check if all ships are placed only if there is a player remaining
    if (playerToPlace === false) return;
    if (ships[playerToPlace.id].every((ship) => ship.placed === true)) {
      // toggle player ok if they are
      setShouldPromptPlayerOk(true);
      fadeOutInText("Ready?");
    } else {
      setShouldPromptPlayerOk(false);
    }
  }, [ships, playerToPlace, fadeOutInText]);

  // change the index any time the current index has been placed
  useEffect(() => {
    if (!playerToPlace) return; // only run if there are still players to place
    // only inc index if there are remaining ships and the current index has been placed
    if (
      ships[playerToPlace.id][indexOfShipToPlace].placed &&
      ships[playerToPlace.id].some((ship) => ship.placed === false)
    ) {
      let resultFound = false;
      let testIndex = indexOfShipToPlace + 1;
      if (testIndex >= ships[playerToPlace.id].length) testIndex = 0;
      while (!resultFound) {
        if (ships[playerToPlace.id][testIndex].placed) {
          testIndex += 1;
        } else {
          resultFound = true;
        }
      }
      setIndexOfShipToPlace(testIndex);
    }
  }, [ships, playerToPlace, indexOfShipToPlace]);

  const toggleHorizontal = () => {
    setHorizontalPlacement((h) => !h);
  };

  const confirmPlayerReady = (playerID) => {
    //remove 'OK' prompt

    dispatch({ type: "READY-PLAYER", playerID: playerID });
    // reset ship placement index to 0 for next player
    // set next player to place
    // check if next player is 1: a player 2: isnt AI, 3: isn't fully placed
    let nextIndex = playerToPlace.index + 1;
    let numberOfHumanPlayers = playerList.filter(
      (player) => players[player].ai === false
    ).length;
    //////This was removed because it will interfere with fade. Refactored below.
    // if there are no more human players, set playerToPlace to false
    // if (nextIndex >= numberOfHumanPlayers) {
    //   setPlayerToPlace(false);
    //   return;
    // }
    ////////////////REFACTOR
    // only advance player to place if there are players left to place

    if (nextIndex < numberOfHumanPlayers) {
      // change prompt for next player
      setShouldPromptPlayerOk(false);
      setIndexOfShipToPlace(0);
      fadeOutInText(initMessageText());
      let nextPlayer = players[playerList[nextIndex]];
      let nextPlayerID = playerList[nextIndex];
      setPlayerToPlace({
        index: nextIndex,
        name: nextPlayer.name,
        id: nextPlayerID,
      });
    } //set the next player to next player;
  };
  return !playerToPlace ? null : (
    <>
      <Sidebar>
        <SidebarMessage>
          <SidebarMessageText fadeIn={fadeInText}>
            {sideBarMessage}
          </SidebarMessageText>
        </SidebarMessage>
        <div className="content">
          <ShipPlacementList
            horizontalPlacement={horizontalPlacement}
            toggleHorizontal={toggleHorizontal}
            shipsToPlace={ships[playerToPlace.id]}
            playerToPlace={playerToPlace.id}
            shouldPromptPlayerOk={shouldPromptPlayerOk}
            confirmPlayerReady={confirmPlayerReady}
            selectShipToPlaceOrReplace={selectIndexOfShip}
            indexOfShipToPlace={indexOfShipToPlace}
            resetMessage={fadeOutInText}
            initMessage={initMessageText}
          />
        </div>
      </Sidebar>
      <div className="boards">
        {console.log(ships, playerToPlace, indexOfShipToPlace)}
        {console.log(gameMode)}
        <PlacementBoard
          board={boards[playerToPlace.id]}
          horizontalPlacement={horizontalPlacement}
          currentShip={ships[playerToPlace.id][indexOfShipToPlace]}
          playerID={playerToPlace.id}
        />
      </div>
    </>
  );
};
