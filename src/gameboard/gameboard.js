// gameboard.js
import { Ship } from "../ship/ship.js";

export const Gameboard = () => {
  const boardSize = 10;
  const ships = [];
  const missedAttacks = [];
  const shipPositions = {}; // Key: 'x,y', Value: ship reference

  const isWithinBounds = (x, y) => {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
  };

  const placeShip = (x, y, length, isHorizontal = true) => {
    const newPositions = [];

    for (let i = 0; i < length; i++) {
      const posX = isHorizontal ? x + i : x;
      const posY = isHorizontal ? y : y + i;
      const key = `${posX},${posY}`;

      // 🚫 Out of bounds?
      if (!isWithinBounds(posX, posY)) {
        throw new Error(`Ship placement out of bounds at (${posX}, ${posY})`);
      }

      // 🚫 Overlapping another ship?
      if (shipPositions[key]) {
        throw new Error(`Ship overlap detected at (${posX}, ${posY})`);
      }

      newPositions.push(key);
    }

    const ship = Ship(length);
    newPositions.forEach((key) => {
      shipPositions[key] = ship;
    });
    ships.push(ship);
    return ship;
  };

  const receiveAttack = (x, y) => {
    const key = `${x},${y}`;
    const targetShip = shipPositions[key];

    if (targetShip) {
      targetShip.hit();
    } else {
      missedAttacks.push([x, y]);
    }
  };

  const getMissedAttacks = () => missedAttacks;

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  return {
    placeShip,
    receiveAttack,
    getMissedAttacks,
    allShipsSunk,
    getShipPositions: () => shipPositions,
  };
};
