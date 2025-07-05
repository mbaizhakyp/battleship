// player.test.js
import { Player } from "./player";

describe("Player", () => {
  test("each player has a unique gameboard", () => {
    const player1 = Player();
    const player2 = Player();
    expect(player1.getGameboard()).not.toBe(player2.getGameboard());
  });

  test("player can attack opponent and hit ship", () => {
    const player1 = Player();
    const player2 = Player();

    player2.getGameboard().placeShip(0, 0, 1);
    player1.attack(player2, 0, 0);

    expect(player2.getGameboard().allShipsSunk()).toBe(true);
  });

  test("computer performs valid random attack", () => {
    const human = Player();
    const computer = Player(true);

    human.getGameboard().placeShip(0, 0, 1);
    computer.randomAttack(human);

    const hits = human.getGameboard().getShipPositions();
    const missed = human.getGameboard().getMissedAttacks();

    const wasAttackMade = Object.keys(hits).length > 0 || missed.length > 0;
    expect(wasAttackMade).toBe(true);
  });
});
