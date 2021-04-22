import { Button, Card, PlayerNameForm } from "./styles/components";
import { useState, useContext } from "react";
import { GameContext, GameDispatch } from "./Game";

export const NamePlayers = () => {
  const dispatch = useContext(GameDispatch);
  const { players, playerList } = useContext(GameContext);
  const humanPlayerList = playerList.filter(
    (player) => players[player].ai === false
  );

  const initInputState = () => {
    let stateObject = {};
    for (let humanPlayerID of humanPlayerList) {
      console.log(humanPlayerID);
      stateObject[humanPlayerID] = players[humanPlayerID].name;
    }
    return stateObject;
  };

  const [formData, setFormData] = useState(() => initInputState());

  const handleChange = (e) => {
    const playerID = e.target.name;
    setFormData((state) => ({ ...state, [playerID]: e.target.value }));
  };

  const createArrayForDispatch = () => {
    //this just feels easier to handle than an object
    return humanPlayerList.map((player) => ({
      playerID: player,
      name: formData[player],
    }));
  };

  const createFormFields = () => {
    return humanPlayerList.map((player, index) => {
      return (
        <li key={`input_for_${player}`}>
          <label htmlFor={`${player}_input`}>Player {index + 1}</label>
          <input
            onChange={handleChange}
            id={`${player}_input`}
            type="text"
            name={`${player}`}
            value={formData[player]}
          />
        </li>
      );
    });
  };
  return (
    <Card>
      <header>
        <h2>Player Names</h2>
      </header>
      <div className="content">
        <PlayerNameForm>
          <ul>{createFormFields()}</ul>
        </PlayerNameForm>
      </div>
      <div className="controls">
        <Button
          onClick={() => {
            dispatch({
              type: "SET-PLAYER-NAMES",
              payload: createArrayForDispatch(),
            });
          }}>
          Start Game
        </Button>
      </div>
    </Card>
  );
};
