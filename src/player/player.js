// player.js
import { Gameboard } from "../gameboard/gameboard.js";

export const Player = (isComputer = false) => {
  const gameboard = Gameboard();

  const attack = (opponent, x, y) => {
    opponent.getGameboard().receiveAttack(x, y);
  };

  const randomAttack = (opponent) => {
    let x, y;
    const tried = new Set(
      opponent
        .getGameboard()
        .getMissedAttacks()
        .map((coord) => coord.toString())
    );

    // Also account for already-hit positions
    Object.keys(opponent.getGameboard().getShipPositions()).forEach((pos) =>
      tried.add(pos)
    );

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (tried.has(`${x},${y}`));

    attack(opponent, x, y);
  };

  return {
    isComputer,
    getGameboard: () => gameboard,
    attack,
    randomAttack,
  };
};
