import { useState, useEffect, useRef } from "react";
import { FadeWrapper } from "./styles/components";

export const TurnFader = ({ showOne, trueContent, falseContent, fadeTime }) => {
  const [switcher, setSwitcher] = useState(showOne);
  const [isOpaque, setIsOpaque] = useState(true);
  const didMount = useRef(false);

  //after timeout, toggle switcher
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    setIsOpaque(false);
    let timeoutID = setTimeout(() => {
      setSwitcher(showOne);
      setIsOpaque(true);
    }, fadeTime);

    return () => clearTimeout(timeoutID); // end a timeout if the fader isn't showing
  }, [fadeTime, showOne]);

  return (
    <FadeWrapper isOpaque={isOpaque} fadeTime={fadeTime}>
      {switcher ? trueContent : falseContent}
    </FadeWrapper>
  );
};
