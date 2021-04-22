import styled, { createGlobalStyle } from "styled-components";

//colors:
export const colors = {
  bg_gray: "#303030",
  bg_gray2: "#3b3b3b",
  invalid: "#b8022c",
  openWater: "#8787d6",
  main: {
    100: "#000031",
    90: "#0e1f4c",
    50: "#696EA5",
    10: "#B4B7F3",
  },

  contrast: {
    100: "#663268",
    90: "#B14a6e",
    50: "#e87664",
    40: "#FFB35B",
    20: "#F9F871",
  },
};

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    html{
        background: ${colors.bg_gray};
    }
    body{
        padding-bottom: 50px;
    }
    h1,h2,h3,h4,h5,p,button,span{
        font-family: "Lexend", sans-serif;
    }
    div,h1,h2,h3,h4,h5,p,h6,button{
        margin: 0;
    }
    header{
        color: ${colors.contrast[40]};
        padding: 2em;
        background: ${colors.bg_gray};
        margin-bottom: 2em;
        h1{
            padding: 0 1em;
            margin: 0 auto;
            max-width: 1200px;
        }
    }
    .contentContainer{
        position: relative;
        margin: 0 auto;
        width: 90%;
        max-width: 1200px;
        display: flex;
        justify-content: center;
        align-items: flex-start; 

        @media only screen and (max-width:635px){
            flex-direction: column;
            align-items: center;
            
        }
    }
    .boards{
        flex-grow: 1;
        display:flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: .5rem;
        .ai{
            align-items: flex-start;
        }
    }
`;

export const CellWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  padding-bottom: 100%;
`;
export const PlayCell = styled(CellWrapper)`
  background-color: ${({ cell, showShip }) =>
    showShip
      ? cell.ship
        ? cell.attacked
          ? colors.invalid
          : colors.bg_gray
        : cell.attacked
        ? colors.openWater
        : colors.main[90]
      : cell.attacked
      ? cell.ship
        ? colors.invalid
        : colors.openWater
      : colors.main[90]};
`;
export const StyledPlacementCell = styled(CellWrapper)`
  background: ${({ bg_color }) => {
    switch (bg_color) {
      case "ship":
        return "gray";
      case "empty":
        return colors.main[90];
      case "invalid":
        return colors.invalid;
      case "valid":
        return colors.contrast[90];
      default:
        return colors.main[90];
    }
  }};
`;
export const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ boardWidth }) => boardWidth}, 1fr);
  max-width: ${({ statBoard, over }) =>
    statBoard && !over ? "200px" : "400px"};
  min-width: ${({ statBoard, over }) =>
    statBoard && !over ? "100px" : "250px"};
  flex-grow: 1;

  &::after {
    padding-bottom: 100%;
  }
`;
export const GameWrapper = styled.div``;
export const MessageWrapper = styled.div`
  text-align: center;
  background-color: grey;
`;
export const Text = styled.p``;

export const ShipSelectionWrapper = styled.div`
  width: 25%;
`;
export const ShipModelWrapper = styled.div`
  display: flex;
`;
export const ShipOrientationWrapper = styled.div`
  transform: ${({ horizontalPlacement }) =>
    horizontalPlacement ? "rotateZ(90deg)" : "rotateZ(0)"};
  transition: transform 0.25s linear;
  margin-top: auto;
  margin-bottom: auto;
`;
export const OrientationFrame = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  #rotateButton {
    color: ${colors.contrast[40]};
  }
  &:hover {
    #rotateButton {
      color: ${colors.contrast[50]};
    }
  }
`;
export const ShipCell = styled.div`
  background-color: grey;
  width: 5px;
  height: 5px;
`;
export const ShipCellLG = styled.div`
  background-color: grey;
  width: 10px;
  height: 10px;
`;
export const ShipWrapper = styled.li`
  flex-grow: 1;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 5%;
  border: 0.02em solid black;
  padding: 0.25rem 1rem;
  cursor: pointer;
  color: ${colors.contrast[40]};
  background-color: ${({ hasBeenPlaced, isCurrentShip, ship, play }) => {
    if (play) {
      if (ship.sunk) {
        return colors.invalid;
      }
      if (ship.hits > 0) {
        return colors.contrast[90];
      }
      return colors.main[90];
    }
    return hasBeenPlaced
      ? colors.contrast[100]
      : isCurrentShip
      ? colors.contrast[90]
      : colors.main[90];
  }};
  &:hover {
    filter: brightness(125%);
  }
  &:nth-child(even) {
    background-color: ${({ hasBeenPlaced, isCurrentShip, ship, play }) => {
      if (play) {
        if (ship.sunk) {
          return colors.invalid;
        }
        if (ship.hits > 0) {
          return colors.contrast[90];
        }
        return colors.main[100];
      }
      return hasBeenPlaced
        ? colors.contrast[100]
        : isCurrentShip
        ? colors.contrast[90]
        : colors.main[100];
    }};
  }
`;
export const ShipInfo = styled.div`
  cursor: pointer;
  display: flex;
  margin: 2px;
  flex-direction: column;
  align-items: center;
  background-color: ${({ allPlayersPlaced, currentSelection }) =>
    !allPlayersPlaced
      ? "cadetblue"
      : currentSelection
      ? "orange"
      : "whitesmoke"};
  &:hover {
    background-color: ${({ allPLayersPlaced, currentSelection }) =>
      currentSelection ? null : !allPLayersPlaced ? null : "ghostwhite"};
  }
`;

export const Sidebar = styled.div`
  z-index: 100;
  flex-grow: 1;
  max-width: 400px;
  min-width: 200px;
  width: 15%;
  position: sticky;
  top: 0.5rem;
  background-color: ${colors.bg_gray2};
  padding: 1rem;
  margin-bottom: 1rem;

  ul {
    padding: 0;
    max-width: 50%;
    min-width: 111px;
  }
  .playerInfo {
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    gap: 3rem;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
  }
  header {
    background: ${colors.main[100]};
    color: ${colors.contrast[40]};
    padding: 1rem;
    margin: 0.25rem;
    display: flex;
    align-items: baseline;
    justify-content: center;
  }
  .currentPlayerTurn {
    font-weight: bold;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
  }

  .list {
    width: 50%;
  }
  .collapseRow {
    display: flex;
    flex-grow: 1;
    min-width: 170px;
    width: 100%;
  }
  @media only screen and (max-width: 635px) {
    width: 100%;
    .buttons {
      flex-direction: row;
    }
    .collapseRow {
    }
    .content {
      flex-direction: column;
      flex-wrap: nowrap;
    }
    .playerInfo {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }
  }
`;
export const PlacementWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
export const ShipName = styled.h4`
  text-transform: uppercase;
  font-size: 0.6rem;
  font-weight: bold;
  display: inline;
`;
export const BoardLabel = styled.label`
  color: ${colors.contrast[40]};
  font-weight: bold;
  background: ${colors.main[100]};
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  text-align: center;
  padding: 0.25rem;
`;
export const BoardAndLabelWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.25em;
  animation: ${({ isVisible }) =>
    isVisible ? "fade-in 0.05s ease-in" : "fade-in 0.05s ease-out reverse"};
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const MessageBox = styled.ul`
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  bottom: 10px;
  width: 90%;
  margin: 0 auto;
  max-width: 900px;
  z-index: 901;
  list-style: none;
`;
export const AlertMessage = styled.li`
  list-style: none;
  color: ${colors.contrast[40]};
  background: ${({ type }) =>
    type === "HIT"
      ? colors.invalid
      : type === "MISS"
      ? colors.main[50]
      : "green"};
  padding: 0.5em 1em;
  span {
    margin-left: 2em;
  }
  animation: fader 0.5s ease-in;
  &:nth-child(even) {
    filter: brightness(0.9);
  }
  @keyframes fader {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const RotateButton = styled.div``;

export const Button = styled.button`
  color: ${colors.contrast[40]};
  font-weight: bold;
  font-size: 0.75rem;
  background: ${colors.main[90]};
  padding: 0.5rem;
  border-radius: 3px;
  border: none;
  margin: 0.25rem;
  &:hover {
    background: ${colors.main[100]};
  }
  span {
    text-align: center;
  }
`;

export const SidebarMessage = styled.div`
  background: ${colors.main[100]};
  margin: 0;
  padding: 1rem;
`;

export const SidebarMessageText = styled.h4`
  color: ${colors.contrast[40]};
  opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`;
export const ReadyPlayerPrompt = styled.div`
  background: ${colors.bg_gray2};
  padding: 2rem;
  text-align: center;
  p {
    font-size: 1.5rem;
    color: ${colors.contrast[40]};
    padding: 2rem;
  }
`;
export const Card = styled.div`
  color: ${colors.contrast[40]};
  background: ${colors.bg_gray2};
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  @media only screen and (max-width: 400px) {
    padding: 0;
    width: 100%;
  }
  ul {
    padding-inline-start: 0;
    @media only screen and (max-width: 400px) {
      padding: 0;
      width: 100%;
    }
  }
  input {
    text-align: right;
    border: 1px solid ${colors.contrast[40]};
    font-weight: bold;
    font-size: 1rem;
    border-radius: 5px;
    background: ${colors.bg_gray};
    padding: 0.5rem;
    color: ${colors.contrast[40]};
    @media only screen and (max-width: 400px) {
      width: 100%;
    }
  }
  header {
    text-align: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    @media only screen and (min-width: 400px) {
      flex-direction: row;
    }
    li {
      display: flex;
      background: ${colors.main[100]};
      @media only screen and (max-width: 400px) {
        text-align: center;
        width: 100%;
        flex-direction: column;
      }
      &:nth-child(odd) {
        background: ${colors.main[90]};
      }
    }
  }
  .initForm {
    list-style: none;
    .initInput {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      align-items: center;
      padding: 1rem;
    }
  }

  .stats {
    list-style: none;
    li {
      margin: 0;
      display: flex;
      gap: 0.5rem;
      color: ${colors.contrast[40]};
      padding: 1rem;
      background: ${colors.main[100]};
      &:nth-child(even) {
        background: ${colors.main[90]};
      }
    }
  }
  .controls {
    margin-top: 1rem;
    text-align: center;
  }
`;

export const PlayerNameForm = styled.form`
  ul {
    list-style: none;
    padding: 2rem;
    li {
      background: ${colors.main[100]};
      color: ${colors.contrast[40]};
      font-weight: bold;
      display: flex;
      justify-content: space-around;
      padding: 1rem;
      gap: 2rem;
      &:nth-child(even) {
        background: ${colors.main[90]};
      }
    }
  }
`;
export const FadeWrapper = styled.div`
  //inherit a whole bunch of stuff to make the wrapper not affect layout
  width: 100%;
  display: inherit;
  flex-direction: inherit;
  flex-wrap: inherit;
  justify-content: inherit;
  align-items: inherit;

  opacity: ${({ isOpaque }) => (isOpaque ? 1 : 0)};
  transition: ${({ fadeTime }) => `opacity ${fadeTime}ms ease-in`};
`;
