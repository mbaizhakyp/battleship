// gameboard.test.js
import { Gameboard } from "./gameboard";

describe("Gameboard", () => {
  test("places ships at specified coordinates", () => {
    const board = Gameboard();
    const ship = board.placeShip(0, 0, 3, true);
    board.receiveAttack(0, 0);
    expect(ship.isSunk()).toBe(false);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);
    expect(ship.isSunk()).toBe(true);
  });

  test("records missed attacks correctly", () => {
    const board = Gameboard();
    board.placeShip(0, 0, 2, true);
    board.receiveAttack(5, 5);
    board.receiveAttack(7, 3);
    expect(board.getMissedAttacks()).toEqual([
      [5, 5],
      [7, 3],
    ]);
  });

  test("allShipsSunk returns true when all ships are sunk", () => {
    const board = Gameboard();
    const ship1 = board.placeShip(0, 0, 2);
    const ship2 = board.placeShip(2, 0, 1);

    board.receiveAttack(0, 0);
    board.receiveAttack(2, 0);
    board.receiveAttack(1, 0);

    expect(ship1.isSunk()).toBe(true);
    expect(ship2.isSunk()).toBe(true);
    expect(board.allShipsSunk()).toBe(true);
  });

  test("allShipsSunk returns false when some ships are not sunk", () => {
    const board = Gameboard();
    board.placeShip(0, 0, 2);
    board.placeShip(3, 3, 2);
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(false);
  });

  test("throws error on overlapping ships", () => {
    const board = Gameboard();
    board.placeShip(0, 0, 3, true);
    expect(() => {
      board.placeShip(2, 0, 3, true); // overlaps at (2, 0)
    }).toThrow("Ship overlap detected");
  });

  test("throws error on out-of-bounds ship", () => {
    const board = Gameboard();
    expect(() => {
      board.placeShip(9, 0, 3, true); // would try to place at (9,0), (10,0), (11,0)
    }).toThrow("Ship placement out of bounds");
  });
});
