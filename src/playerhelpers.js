export const createPlayer = (ai, idIndex) => {
  // create player ai and ID status
  let name = ai ? `AI ${idIndex}` : `Player ${idIndex + 1}`;

  let player = { ai, shipsPlaced: false, name, shots: 0, hits: 0 };
  return { ...player };
};

// board [[{attacked,ship},{...}],[]]
