// game.js
import { Player } from "../player/player.js";
import { DOMHandler } from "../dom/domHandler.js";

export const Game = (() => {
  let human;
  let computer;
  let gameOver = false;

  const init = () => {
    human = Player(false);
    computer = Player(true);

    // Hardcode ships for now
    human.getGameboard().placeShip(0, 0, 3, true);
    human.getGameboard().placeShip(4, 4, 2, false);
    computer.getGameboard().placeShip(2, 2, 3, true);
    computer.getGameboard().placeShip(6, 6, 2, false);

    render();

    // Add event listener to computer board
    const computerBoard = document.getElementById("computer-board");
    computerBoard.addEventListener("click", handlePlayerAttack);
  };

  const render = () => {
    DOMHandler.renderBoard("player-board", human.getGameboard(), false);
    DOMHandler.renderBoard("computer-board", computer.getGameboard(), true);
  };

  const handlePlayerAttack = (e) => {
    if (gameOver || !e.target.classList.contains("cell")) return;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    const cellKey = `${x},${y}`;

    // Prevent double attack
    const alreadyAttacked =
      computer
        .getGameboard()
        .getMissedAttacks()
        .some(([mx, my]) => mx === x && my === y) ||
      computer.getGameboard().getShipPositions()[cellKey]?.isSunk();

    if (alreadyAttacked) return;

    human.attack(computer, x, y);
    checkGameEnd();

    if (!gameOver) {
      setTimeout(() => {
        computer.randomAttack(human);
        checkGameEnd();
        render();
      }, 500);
    }

    render();
  };

  const checkGameEnd = () => {
    if (human.getGameboard().allShipsSunk()) {
      alert("💀 You lost!");
      gameOver = true;
    } else if (computer.getGameboard().allShipsSunk()) {
      alert("🎉 You win!");
      gameOver = true;
    }
  };

  return { init };
})();
