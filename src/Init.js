import { Card, Button } from "./styles/components";
import { useState, useContext } from "react";
import { GameDispatch } from "./Game";

export const Init = () => {
    const [playerCount, setPlayerCount] = useState(2);
    const [aiCount, setAiCount] = useState(1);
    const [boardSize, setBoardSize] = useState(10);
    const dispatch = useContext(GameDispatch);
    ///Player names??
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("initializing");
        dispatch({
            type: "INITIALIZE-GAME",
            payload: {
                numberOfPlayers: playerCount,
                numberOfAI: aiCount,
                boardWidth: boardSize,
            },
        });
    };
    const handleChange = (e) => {
        switch (e.target.name) {
            case "players": {
                setPlayerCount(parseInt(e.target.value));
                break;
            }
            case "aiCount": {
                setAiCount(parseInt(e.target.value));
                break;
            }
            case "boardSize": {
                setBoardSize(parseInt(e.target.value));
                break;
            }
            default:
                break;
        }
    };
    return (
        <Card>
            <header>
                <h2>Game Setup</h2>
            </header>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <ul className="initForm">
                        <li className="initInput">
                            <label htmlFor="totalPlayers">
                                Total Number of Players:
                            </label>
                            <input
                                type="number"
                                value={playerCount}
                                name="players"
                                id="totalPlayers"
                                min={2}
                                max={4}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="initInput">
                            <label htmlFor="totalAI">
                                Number of AI players:
                            </label>
                            <input
                                type="number"
                                value={aiCount}
                                name="aiCount"
                                id="totalAI"
                                min={0}
                                max={playerCount}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="initInput">
                            <label htmlFor="boardSize">Width of Board:</label>
                            <input
                                type="number"
                                value={boardSize}
                                name="boardSize"
                                id="boardSize"
                                min={8}
                                max={15}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                </form>
            </div>
            <div className="controls">
                <Button onClick={handleSubmit}>Start</Button>
            </div>
        </Card>
    );
};
