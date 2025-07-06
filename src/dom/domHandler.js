// domHandler.js
export const DOMHandler = (() => {
  const createCell = (x, y, isEnemy = false) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.x = x;
    cell.dataset.y = y;
    if (isEnemy) cell.classList.add("enemy");
    return cell;
  };

  const renderBoard = (containerId, gameboard, isEnemy = false) => {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = createCell(x, y, isEnemy);
        const key = `${x},${y}`;

        if (!isEnemy && gameboard.getShipPositions()[key]) {
          cell.classList.add("ship");
        }

        if (
          gameboard.getMissedAttacks().some(([mx, my]) => mx === x && my === y)
        ) {
          cell.classList.add("miss");
        }

        if (
          gameboard.getShipPositions()[key] &&
          gameboard.getShipPositions()[key].isSunk()
        ) {
          cell.classList.add("sunk");
        }

        container.appendChild(cell);
      }
    }
  };

  return { renderBoard };
})();
