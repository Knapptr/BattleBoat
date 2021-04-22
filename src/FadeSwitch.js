import { useState, useEffect } from "react";
import { FadeWrapper } from "./styles/components";

export const FadeSwitch = ({ optionsObject, currentOption, fadeTime }) => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [currentlyRendered, setCurrentlyRendered] = useState(currentOption);

  useEffect(() => {
    setIsOpaque(false);
    setTimeout(() => {
      setCurrentlyRendered(currentOption);
      setIsOpaque(true);
    }, fadeTime);
  }, [currentOption, fadeTime]);

  return (
    <FadeWrapper isOpaque={isOpaque} fadeTime={fadeTime}>
      {optionsObject[currentlyRendered]}
    </FadeWrapper>
  );
};
