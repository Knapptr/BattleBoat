import {
  attackCellOnBoard,
  placeShipOnBoard,
  removeShipFromBoard,
} from "./game/board";
import { createFleet, defaultShipArray } from "./shipFactory";
import { createBoard } from "./boardfactory";
import { createPlayer } from "./playerhelpers";
import { attackShipInfleet, setShipPlacedInFleet, unplaceShip } from "./ship";
import { getAIPlaceShipCoords } from "./game/aiPlace";
import {
  handleTurns,
  checkIfGameOver,
  checkIfPlayerOutOfGame,
} from "./gamehelpers";

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE-GAME": {
      const { numberOfPlayers, numberOfAI, boardWidth } = action.payload;
      const nextMode = numberOfPlayers > numberOfAI ? "namePlayers" : "play";
      return createInitialState(
        {
          numberOfPlayers,
          numberOfAI,
          boardWidth,
          shipArray: defaultShipArray,
        },
        nextMode
      );
    }
    case "SET-PLAYER-NAMES": {
      const arrayOfNewPlayerNames = action.payload;
      const newlyNamedPlayers = { ...state.players };
      arrayOfNewPlayerNames.forEach((player) => {
        const playerBeingRenamed = newlyNamedPlayers[player.playerID];
        newlyNamedPlayers[player.playerID] = {
          ...playerBeingRenamed,
          name: player.name,
        };
      });
      return { ...state, players: newlyNamedPlayers, gameMode: "setup" };
    }
    case "READY-PLAYER": {
      const playerID = action.playerID;
      const player = state.players[playerID];
      let returnState = {
        ...state,
        players: {
          ...state.players,
          [playerID]: { ...player, shipsPlaced: true },
        },
      };
      // check if all players have placed ships. change mode if they have
      if (
        returnState.playerList.every((player) => {
          return returnState.players[player].shipsPlaced === true;
        })
      ) {
        returnState = { ...returnState, gameMode: "play" };
      }
      console.log("old state", state);
      console.log("updated state:", returnState);
      return returnState;
    }

    case "CLEAR-BOARD": {
      const playerID = action.playerID;
      const newBoard = createBoard(state.boards.player_0.length);
      const newShips = state.ships[playerID].map((ship) => ({
        ...ship,
        placed: false,
      }));
      return {
        ...state,
        boards: { ...state.boards, [playerID]: newBoard },
        ships: { ...state.ships, [playerID]: newShips },
      };
    }

    case "PLACE-SHIP": {
      const playerID = action.playerID;
      const board = state.boards[playerID];
      const { y, x, ship, horizontal } = action.payload;
      const ships = state.ships[playerID];
      const newBoard = placeShipOnBoard(board, y, x, ship, horizontal);
      const newShips = setShipPlacedInFleet(ships, ship);
      return {
        ...state,
        boards: { ...state.boards, [playerID]: newBoard },
        ships: { ...state.ships, [playerID]: newShips },
      };
    }
    case "REMOVE-SHIP": {
      console.log("removing");
      const playerID = action.playerID;
      const shipToRemove = action.payload;
      const board = state.boards[playerID];
      const ships = state.ships[playerID];
      const newBoard = removeShipFromBoard(board, shipToRemove);
      const newShips = unplaceShip(ships, shipToRemove);
      return {
        ...state,
        boards: { ...state.boards, [playerID]: newBoard },
        ships: { ...state.ships, [playerID]: newShips },
      };
    }
    case "RANDOM-PLACE-ONE": {
      const playerID = action.playerID;
      const ship = action.payload;
      const ships = [...state.ships[playerID]];
      const board = [...state.boards[playerID]];
      const { coords, horizontal } = getAIPlaceShipCoords(board, ship);
      const [y, x] = coords;
      const newBoard = placeShipOnBoard(board, y, x, ship, horizontal);
      const newShips = setShipPlacedInFleet(ships, ship);

      return {
        ...state,
        boards: { ...state.boards, [playerID]: newBoard },
        ships: { ...state.ships, [playerID]: newShips },
      };
    }
    case "RANDOM-PLACE-ALL": {
      // recieves action.playerIndex
      console.log("random place");
      const playerID = action.playerID;
      const ships = state.ships[playerID];
      // start with clear board
      let newBoard = createBoard(state.boards.player_0.length);
      let newShips = [...ships];
      // get coords for each ship
      state.ships[playerID].forEach((ship) => {
        // get valid coordinates for ship
        const { coords, horizontal } = getAIPlaceShipCoords(newBoard, ship);
        // get y and x for readability
        const [y, x] = coords;
        newBoard = placeShipOnBoard(newBoard, y, x, ship, horizontal);
        newShips = setShipPlacedInFleet(newShips, ship);
      });
      // update newPlayers
      return {
        ...state,
        boards: { ...state.boards, [playerID]: newBoard },
        ships: { ...state.ships, [playerID]: newShips },
      };
    }
    case "ATTACK": {
      // handles attacking coords, and sets the next turn
      // recieve action.playerIndex, action.payload([coords])
      const playerID = action.playerID;
      const [y, x] = action.payload;
      const board = state.boards[playerID];
      let ships = [...state.ships[playerID]];
      const cell = board[y][x];
      // mark cell as attacked
      const newBoard = attackCellOnBoard(board, y, x);

      const shootingPlayer = state.players[state.playerList[state.turnIndex]];
      console.log("shooting player", shootingPlayer);
      let hits = shootingPlayer.hits;

      // if cell has ship...
      if (cell.ship) {
        // mark ship hit
        ships = attackShipInfleet(ships, cell.ship);
        // add hit to player who shot
        hits += 1;
      }
      // Add shot to player who made attack!!!
      return {
        ...state,
        players: {
          ...state.players,
          [state.playerList[state.turnIndex]]: {
            ...shootingPlayer,
            shots: shootingPlayer.shots + 1,
            hits: hits,
          },
        },
        lastAttackedPlayer: playerID,
        boards: { ...state.boards, [playerID]: newBoard },
        ships: { ...state.ships, [playerID]: ships },
        allowAttack: false,
      };
    }
    case "SET-NEXT-TURN": {
      // check if the player just attacked was eliminated, remove them if so
      let playersInGame = [...state.playerList];
      let playersOutOfGame = [...state.playersOutOfGame];
      if (state.lastAttackedPlayer) {
        if (checkIfPlayerOutOfGame(state.ships[state.lastAttackedPlayer])) {
          const playerEliminated = state.lastAttackedPlayer;
          playersOutOfGame = [...playersOutOfGame, playerEliminated];
          playersInGame = state.playerList.filter(
            (player) => player !== playerEliminated
          );
        }
      }
      // set game over if there is only 1 player left. return here to avoid extra work

      if (checkIfGameOver(playersInGame)) {
        console.log("Game is over");
        return {
          ...state,
          gameOver: true,
          playerList: playersInGame,
          turnIndex: 0,
          playersOutOfGame: playersOutOfGame,
          allowAttack: false,
          gameMode: "over",
        };
      }

      // set if the player is ready ONLY if they are AI or there is only 1 human player

      const nextTurn = handleTurns(playersInGame.length, state.turnIndex);
      let humanPlayers = state.playerList.filter(
        (player) => state.players[player].ai === false
      );
      let playerIsReady =
        humanPlayers.length < 2 || state.players[state.playerList[nextTurn]].ai
          ? true
          : false;
      return {
        ...state,
        playerList: playersInGame,
        playersOutOfGame: playersOutOfGame,
        turnIndex: nextTurn,
        allowAttack: true,
        currentTurnPlayerIsReady: playerIsReady,
      };
    }
    case "SET-TURN-READY": {
      return { ...state, currentTurnPlayerIsReady: true };
    }
    case "SET-MODE": {
      return { ...state, gameMode: action.payload };
    }

    default:
      return {};
  }
};

export const defaultInitialState = {
  numberOfPlayers: 2,
  numberOfAI: 1,
  boardWidth: 10,
  shipArray: defaultShipArray,
};
export const createInitialState = (
  { numberOfPlayers, numberOfAI, boardWidth, shipArray },
  initializeWithMode = "init"
) => {
  // instantiate players
  const players = {};
  // array for iteration
  const playerList = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    if (i < numberOfPlayers - numberOfAI) {
      // create Human players
      players[`player_${i}`] = createPlayer(false, i);
      // create AI players
    } else {
      players[`player_${i}`] = createPlayer(true, i);
    }
    playerList.push(`player_${i}`);
  }
  // instantiate boards
  const boards = {};
  playerList.forEach((player) => {
    boards[player] = createBoard(boardWidth);
  });
  // instantiate ships
  const ships = {};
  playerList.forEach((player) => {
    ships[player] = createFleet(shipArray);
  });
  // turnIndex. start at first player
  const turnIndex = 0;
  //gameover
  const gameOver = false;
  // SETUP AI BOARDS
  const aiList = playerList.filter((player) => players[player].ai === true);
  if (aiList.length > 0) {
    // randomize each board
    aiList.forEach((aiPlayer) => {
      let aiPlayerShips = ships[aiPlayer];
      let aiPlayerBoard = boards[aiPlayer];
      players[aiPlayer].shipsPlaced = true;
      aiPlayerShips.forEach((ship) => {
        // marks all ships placed as true.
        // this is done by ref, so you shouldn't need to assign again
        ship.placed = true;
        const { coords, horizontal } = getAIPlaceShipCoords(
          aiPlayerBoard,
          ship
        );
        // get y and x for readability
        const [y, x] = coords;
        aiPlayerBoard = placeShipOnBoard(aiPlayerBoard, y, x, ship, horizontal);
        boards[aiPlayer] = aiPlayerBoard;
      });
    });
  }

  // modes [init,setup,play,over]

  /////////////CHANGE ME
  const gameMode = initializeWithMode;
  ////////////////////////////////////////////////

  const playersOutOfGame = [];
  return {
    players,
    ships,
    boards,
    playerList,
    turnIndex,
    gameOver,
    gameMode,
    playersOutOfGame,
    allowAttack: true,
    currentTurnPlayerIsReady: false,
  };
};
