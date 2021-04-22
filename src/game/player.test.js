import { createPlayer, togglePlayerTurn } from "./player.js";

const standardPlayers = [
    { name: "human", ai: false },
    { name: "computer", ai: true },
];
test("create a player", () => {
    expect(
        createPlayer(standardPlayers[0].name, standardPlayers[0].ai)
    ).toEqual({
        name: "human",
        ai: false,
        isTurn: false,
    });
});
test("toggle turn", () => {
    expect(togglePlayerTurn(createPlayer("human", false))).toEqual({
        ...createPlayer("human", false),
        isTurn: true,
    });
});
