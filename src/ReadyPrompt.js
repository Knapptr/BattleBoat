import { ReadyPlayerPrompt, Button } from "./styles/components";

export const ReadyPrompt = ({ playerName, playerID, setPlayerReady }) => {
  return (
    <ReadyPlayerPrompt>
      <p>{playerName}, are you ready?</p>
      <Button
        onClick={() => {
          setPlayerReady(playerID);
        }}>
        OK
      </Button>
    </ReadyPlayerPrompt>
  );
};
