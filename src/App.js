import "./App.css";
import { Game } from "./Game";
import { createContext } from "react";
import { useAlert } from "./useAlert";
export const AlertContext = createContext();

function App() {
  const [alerts, addAlert] = useAlert(1, 2000);
  return (
    <>
      <header>
        <h1>Battle Boat</h1>
      </header>
      <AlertContext.Provider value={addAlert}>
        <div className="contentContainer">
          <Game />
        </div>
      </AlertContext.Provider>
      {alerts}
    </>
  );
}

export default App;
