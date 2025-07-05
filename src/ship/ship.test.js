// ship.test.js
import { Ship } from "./ship";

describe("Ship", () => {
  test("creates ship of given length", () => {
    const ship = Ship(4);
    expect(ship.length).toBe(4);
  });

  test("records hits correctly", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(2);
  });

  test("does not exceed hit count beyond length", () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(2);
  });

  test("detects sunk status correctly", () => {
    const ship = Ship(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
