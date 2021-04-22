export const createPlayer = (name = "human", ai = true) => {
    return {
        name,
        ai,
        isTurn: false,
    };
};
export const togglePlayerTurn = (player) => {
    return { ...player, isTurn: !player.isTurn };
};
